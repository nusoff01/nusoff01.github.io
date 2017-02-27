

class BipartideGraph {
    constructor(data, variableA, variableB, svgObj, aOrder, 
                bOrder, aColors, stringFormatters) {
        this.LINKOPACITY = .15;
        this.LINKOPACITYHOVER = .5;
        this.LINKOPACITYNOTHOVER = .07;
        this.BARHOVEROPACITY = 1;
        this.BARNOTHOVEROPACITY = .5;
        this.BARNORMALOPACITY = .85;

        this.formatSelectedString = stringFormatters.selectedString;
        this.formatVarVal = stringFormatters.varValue;

        this.data = data;
        this.a = variableA;
        this.b = variableB;
        if(svgObj){
            this.svg = svgObj.svg;
            this.svgHeight = svgObj.height;
            this.svgWidth = svgObj.width;
        }

        this.aOrder = aOrder;
        this.bOrder = bOrder;
        this.aColors = aColors
        this.aBars = this.createABars();
        this.bBars = this.createBBars();
        this.links = this.createLinks();

        this.drawLabels();
        this.drawCategoryHeader();
        this.updateLinkPaths();

        this.selectionText = this.svg.append("text")
                                .attr("x", this.svgWidth/2)
                                .attr("y", 45)
                                .style("text-anchor", "middle")
                                .style("font-weight", "lighter")
                                .attr("id", "selection-text")
                                .attr("font-size", this.selectionFontSize())
                                .text("mouseover a bar to expand details about the data")

        var ctx = this;
        window.addEventListener("resize", () => {this.redraw(ctx)});
    }

    selectionFontSize() {
        return Math.min(Math.max((this.svgWidth / 50), 7), 20);
    }

    // when the dimensions of the page change, so should the graph
    redraw(ctx) {
        ctx.svgWidth = Math.min(Math.max(chartDiv.clientWidth, 300), 900);
        ctx.svgHeight = Math.min(Math.max(chartDiv.clientHeight, 300), 800);
        ctx.svg
            .attr("width", ctx.svgWidth)
            .attr("height", ctx.svgHeight);


        ctx.svg.selectAll(".header-text")
                .attr("font-size", ctx.headerTextSize())
                .attr("x", (d) => {
                    return this.headerTextX(d[0]);
                });

        ctx.svg.select("#middle-divider")
                .attr("x1", this.svgWidth / 2)
                .attr("x2", this.svgWidth / 2);

        ctx.svg.select("#bottom-divider")
                .attr("x2", this.svgWidth)

        var aBinsArray = this.createBins("A");
        var bBinsArray = this.createBins("B");

        var barsA = ctx.svg.selectAll('.ABars');
        barsA.sort(function(m, n) {
            return (m.yPos > n.yPos)
        });
        barsA.attr("width", ctx.getBarWidth())
                .attr("x", function(d) {
                    return ctx.leftSideX();
                })
                .attr("y", function(d, i) {
                    d.yPos = ctx.barY(d, i, aBinsArray);
                    return d.yPos;
                })
                .attr("height", (d, i) => {
                    return ctx.heightFromValue(d.v);
                });

        var barsB = ctx.svg.selectAll('.BBars');
        barsB.sort(function(m, n) {
            return (m.yPos > n.yPos)
        });
        barsB.attr("width", ctx.getBarWidth())
                .attr("x", function(d) {
                    return ctx.rightSideX();
                })
                .attr("y", function(d, i) {
                    d.yPos = ctx.barY(d, i, bBinsArray);
                    return d.yPos;

                })
                .attr("height", (d, i) => {
                    return ctx.heightFromValue(d.v);
                });

        ctx.updateLinkPaths();

        ctx.svg.selectAll(".subsetTitle")
                .attr("font-size", (d) =>{
                    return Math.max(Math.min(20, this.svgWidth / 50), 8)
                })
                .attr("x", (d) =>{
                    return (d.side == "A") ? 
                        (this.leftSideX() - 20) : 
                        (this.rightSideX() + this.getBarWidth() + 20)  ;
                })

        ctx.selectionText
                .transition(ctx.t())
                .attr("font-size", ctx.selectionFontSize())
                .attr("x", this.svgWidth / 2);

        ctx.defaultLabelPositions();

        ctx.svg.selectAll(".barLabel")
                .attr("font-size", this.barLabelFontSize());
    //             .attr("y", function(c) {
    //                 console.log(d3.select(this))
    //                 // d.hoverYPos + 15
    //             })
    //             .attr("x", function(c) { 
    //                 console.log(d3.select(this))
    //                 return ((d3.select(this).attr("side") == "A") ? 
    //                     ctx.leftSideX() : ctx.rightSideX()) + 2;
    //             })
    }

    headerTextSize() {
        return Math.min(Math.max(this.svgWidth / 30, 12), 20); 
    }

    headerTextX(side) {
        var middle = this.svgWidth / 2;
        if(side == "l"){
            return middle - 10;
        }
        return middle + 10
    }

    drawCategoryHeader() {
        this.svg.append("text")
                .data("l")
                .attr("class", "header-text")
                .attr("x", (d) => {
                    return this.headerTextX(d[0]);
                })
                .style("text-anchor", "end")
                .text(this.a);



        this.svg.append("text")
                .data("r")
                .attr("class", "header-text")
                .attr("x", (d) =>{
                    return this.headerTextX(d[0]);
                })
                .style("text-anchor", "start")
                .text(this.b);

        this.svg.selectAll(".header-text")
                .attr("y", 20)
                .attr("font-size", this.headerTextSize());

        //divider lines
        this.svg.append("line")
                .attr("id", "middle-divider")
                .attr("x1", (this.svgWidth / 2))
                .attr("x2", (this.svgWidth / 2))
                .attr("y1", 0)
                .attr("y2", 25)
                .attr("stroke", "black")
                .attr("stroke-width", 2)

        this.svg.append("line")
                .attr("id", "bottom-divider")
                .attr("x1", 0)
                .attr("x2", this.svgWidth)
                .attr("y1", 25)
                .attr("y2", 25)
                .attr("stroke-width", 1)
                .attr("stroke", "black")
    }

    isSelectedLabel(barSetName, varA, varB, d) {
        if(barSetName == "ABars" && d.side == "A") {
            return (d.varA == varA)
        }
        if(barSetName == "BBars" && d.side == "B") {
            return (d.varB == varB);
        }
        return false;
    }

    setSelectedLabels(barSetName, varA, varB) {
        var ctx = this;
        var subsetTitles = d3.selectAll(".subsetTitle")
            .attr("visibility", (d) =>{
                if (barSetName == "ABars"){ 
                    if(d.side == "A") {
                        return (d.varA == varA) ? "visible" : "hidden"
                    } else {
                        return "visible";
                    }
                }
                if (d.side == "B") {
                    return (d.varB == varB) ? "visible" : "hidden"
                } 
                return "visible";
            })
            .transition(ctx.t())
            .attr("y", function(d) {
                if(ctx.isSelectedLabel(barSetName, varA, varB, d)){
                    return ctx.svgHeight / 2;
                } else {
                    return d3.select(this).attr("y")
                }
            })
            .attr("x", function(d){
                var prevX = d3.select(this).attr("x") 
                if(ctx.isSelectedLabel(barSetName, varA, varB, d)){
                    return (barSetName == "ABars") ? 0 : ctx.svgWidth;
                } else {
                    return prevX
                }
            })
            .attr("text-anchor", function(d) {
                var prevAnchor = d3.select(this).attr("text-anchor") 
                if(ctx.isSelectedLabel(barSetName, varA, varB, d)){
                    return (barSetName == "ABars") ? "start" : "end";
                } else {
                    return prevAnchor;
                }
            })
            .style("z-index", -100)
    }

    defaultLabelPositions() {
        d3.selectAll(".subsetTitle")
            .attr("visibility", (d) =>{
                return "visible"
            })
            .transition(this.t())
            .attr("y", (d) => {
                return d.yPos + 14;
            })
            .attr("x", (d) =>{
                return (d.side == "A") ? 
                    (this.leftSideX() - 20) : 
                    (this.rightSideX() + this.getBarWidth() + 20)  ;
            })
            .attr("text-anchor", (d) => {
                    return (d.side == "A") ? "end" : "start"}
            );

    }

    //is this element in the group of selected items on the selected side?
    isPrimarySelection(barSetName, varA, varB, d) {
        if(barSetName == "ABars") {
                return (d.varA == varA && (d.side + "Bars") == barSetName)
            } else {
                return (d.varB == varB && (d.side + "Bars") == barSetName)
            }
    }

    subsetSum (barSetName, varA, varB) {
        var selection = this.svg.selectAll(".bar").filter((d) =>{
            return this.isPrimarySelection(barSetName, varA, varB, d);
        })

        var sum = 0;
        selection.each(function(d) {
            sum += d.v
        });
        return sum;
    }

    //the bar multiplier is the quotient between the expanded bar
    //  height and the normal bar height
    setBarMultiplier (barSetName, varA, varB) {
        var sum = this.subsetSum(barSetName, varA, varB)

        //adjust for the space between each group
        var gaps = d3.selectAll(".bar").filter((d) => {
            if((d.side + "Bars" == barSetName) && d.isFirst){
                return true;
            } 
            return false
        });
        var gapOffset = (Math.max(gaps.size(), 1) - 1) * .02;
        return ((1 + gapOffset)/ sum)         
    }

    //given parameters which determine which bar is selected, set all 
    //  the bars' heights
    setSelectedBarHeights (barSetName, varA, varB) {
        var barMultiplier = this.setBarMultiplier(barSetName, varA, varB);
        

        var ctx = this;
        return this.svg.selectAll(".bar")
                .attr("height", function(d, i) {
                    if(ctx.isPrimarySelection(barSetName, varA, varB, d)) {
                        d.heightHover = this.getAttribute("height") * barMultiplier;
                    } else if(d.side + "Bars" != barSetName){
                        d.heightHover = this.getAttribute("height")
                    } else {
                        d.heightHover = 0;
                    }
                    return d.heightHover;
                });
    }

    topOffset() {
        return 70;
    }

    //given parameters which determine which bar is selected, set all 
    //  the bars' y positions
    setSelectedBarYs (barSetName, varA, varB) {
        var barMultiplier = this.setBarMultiplier(barSetName, varA, varB);

        var selection = this.svg.selectAll(".bar").filter((d) =>{
            return this.isPrimarySelection(barSetName, varA, varB, d);
        })
        selection.sort(function(m, n){
            return m.yPos > n.yPos;
        })
        selection.attr("y", (d, i) =>{
            console.log("setting y")
                    if(i == 0) {
                        d.hoverYPos = this.topOffset();
                        return d.hoverYPos;
                    } else {
                        var prev = selection.data()[i - 1]
                        d.hoverYPos = prev.heightHover + prev.hoverYPos;
                        return d.hoverYPos;
                    }
                });
    }

    //set the opacity for bars for a given bar hover
    selectedBarFillOpacity (barSetName, varA, varB, ctx, d) {
        if(barSetName == "ABars"){
            if(d.varA == varA){
                return ctx.BARHOVEROPACITY;
            } else {
                return ctx.BARNOTHOVEROPACITY;
            }
        } else {
            if(d.varB == varB){
                return ctx.BARHOVEROPACITY;
            } else {
                return ctx.BARNOTHOVEROPACITY;
            }
        }
    }

    // sets the opacity for links for a given bar hover
    selectedLinkFillOpacity (barSetName, varA, varB, ctx, d) {
        if(barSetName == "ABars"){
            if(d.varA == varA){
                return ctx.LINKOPACITYHOVER;
            } else {
                return ctx.LINKOPACITYNOTHOVER;
            }
        } else {
            if(d.varB == varB){
                return ctx.LINKOPACITYHOVER;
            } else {
                return ctx.LINKOPACITYNOTHOVER;
            }
        }
    }

    setSelectionText(barSetName, d) {
        var subsetSum = this.subsetSum(barSetName, d.varA, d.varB)
        var rawVal = d.v / subsetSum;
        var retString = this.formatSelectedString(rawVal, d);
        this.selectionText.text(retString)
    }

    //UPDATE PROCESS:
    // 1. change height of bars
    // 2. change links
    // 3. change the labels

    barOnMouseOver (d, ctx){
        var varA = d.varA;
        var varB = d.varB;
        var barSetName = d.barSetName;
        d3.selectAll(".bar")
            .style("fill-opacity", (d) => {
                return this.selectedBarFillOpacity(barSetName, varA, varB, ctx, d);
            })
            .attr("pointer-events", (d) => {
                if(this.isSelectedLabel(barSetName, varA, varB, d)){
                    return "all"  
                } else {
                    return "none"
                }
            })
        d3.selectAll(".link")
            .style("fill-opacity", (d) => {
                return this.selectedLinkFillOpacity(barSetName, varA, varB, ctx, d);
            });

        this.setSelectedBarHeights(barSetName, varA, varB);
        this.setSelectedBarYs(barSetName, varA, varB);
        this.setSelectedLabels(barSetName, varA, varB);

        this.createBarLabels(barSetName, varA, varB)
        this.updateLinkPaths();

        
    }

    barLabelFontSize() {
        return Math.min(Math.max(this.svgWidth / 65, 6), 13);
    }

    createBarLabels(barSetName, varA, varB) {
        var selection = this.svg.selectAll(".bar").filter((d) =>{
            return this.isPrimarySelection(barSetName, varA, varB, d);
        })
        selection.each((d) =>{
            this.svg.append("text")
            .attr("class", "barLabel")
                .attr("y", d.hoverYPos + 15)
                .attr("side", d.side)
                .attr("x", (c) => { 
                    return ((d.side == "A") ? 
                        this.leftSideX() : this.rightSideX()) + 2;
                })
                .attr("text-anchor", (c) => {
                    return "start"
                    return (d.side == "A") ? "end" : "start";
                })
                .attr("pointer-events", "none")
                .attr("font-size", this.barLabelFontSize())
                .text((c) => {
                    var subsetSum = this.subsetSum(barSetName, varA, varB)
                    var rawVal = d.v / subsetSum;
                    
                    return (Math.round(rawVal * 1000) / 10) + "%";
                })
        })
    }

    getBarWidth() {
        return Math.max(Math.min(50, this.svgWidth / 15), 20);
    }

    leftSideX () {
        return this.svgWidth * .25;
    }

    rightSideX() {
        return this.svgWidth * .75 - this.getBarWidth();
    }

    barOnMouseout(d, ctx) {
        d3.selectAll(".bar")
            .attr("pointer-events", "all")
            .style("fill-opacity", ctx.BARNORMALOPACITY)
            .attr("height", (d) => {
                return this.heightFromValue(d.v);
            })
            .attr("y", (d) => {
                return d.yPos;
            })

        d3.selectAll(".link")
            .style("fill-opacity", ctx.LINKOPACITY)

        this.updateLinkPaths();
        this.defaultLabelPositions();

        d3.selectAll(".barLabel").remove();
    }

    createBins(side) {
        var binsArray = [];
        this.data.forEach( (d, i) => {
            binsArray.push({varA : d[this.a], varB : d[this.b], v : d.val})
        });
        if(side == "A"){
            return this.aBinSort(binsArray);
        }
        return this.bBinSort(binsArray);
    }

    createABars () {
        var aBinsArray = this.createBins("A");
        var aBars = this.createBars("ABars", this.leftSideX(), aBinsArray)
        return aBars;
    }

    createBBars () {
        var bBinsArray = this.createBins("B");
        var bBars = this.createBars("BBars", this.rightSideX(), bBinsArray)
        return bBars;
    }

    drawLabels () {
        var firstElements = this.svg.selectAll(".bar_g").filter(function(d){
            return d3.select(this).select("rect").data()[0].isFirst;
        });
        firstElements.append("text")
                .attr("class", "subsetTitle")
                .attr("font-size", (d) =>{
                    return Math.max(Math.min(20, this.svgWidth / 50), 8)
                })
                .text( (d) => {
                    return this.formatVarVal((d.side == "A") ? d.varA : d.varB);
                })

        this.defaultLabelPositions();
                                
    }

    heightFromValue (value) {
        return value * (this.svgHeight - 120);
    }

    aBinSort (aBinsArray) {
        var aBinsObject = {};
        aBinsArray = aBinsArray.map((f) => {
            aBinsObject['' + f.varA + "_" + f.varB] = f
        })
        
        var sortedArray = []
        for(var aInd in this.aOrder) {
            var counter = 0;
            for (var bInd in this.bOrder) {
                var bName = this.bOrder[bInd];
                var aName = this.aOrder[aInd];
                var bin = aBinsObject['' + aName + "_" + bName];

                if(counter == 0){
                    bin.isFirst = true;
                }
                bin.side = "A"
                sortedArray.push(bin);
                counter++;
            }
        }
        return sortedArray;
    }

    bBinSort (bBinsArray) {
        var bBinsObject = {};
        bBinsArray = bBinsArray.map((f) => {
            bBinsObject['' + f.varA + "_" + f.varB] = f
        })
        
        var sortedArray = []
        for(var bInd in this.bOrder) {
            var counter = 0;
            for (var aInd in this.aOrder) {

                var bName = this.bOrder[bInd];
                var aName = this.aOrder[aInd];
                var bin = bBinsObject['' + aName + "_" + bName];
                if(counter == 0){
                    bin.isFirst = true;
                }
                bin.side = "B"
                sortedArray.push(bin);
                counter++;
            }
        }
        return sortedArray;
    }

    barID (groupName, a, b) {
        return groupName + "_" + a + "_" + b;
    }

    getDividerWidth() {
        return this.heightFromValue(.02)
    }

    barY(d, i, binsArray) {
        // console.log(binsArray)
        var offset = 0;
        var dividerWidth = d.isFirst ? this.getDividerWidth() : 0
        if(i > 0) {
            var offset = binsArray[i - 1].yPos + this.heightFromValue(binsArray[i - 1].v);
            binsArray[i].yPos = offset + dividerWidth;
            return binsArray[i].yPos;
        } else {
            binsArray[i].yPos = 70;
            return binsArray[i].yPos;
        }
    }

    //creates a set of bars, given the x position of the bars, the nameset
    //  of the bars, and an array of values used to create the bars dimensions
    createBars (barSetName, xPos, binsArray) {
        return this.svg.selectAll(barSetName).data(binsArray).enter().append("g")
            .attr("class", "bar_g")
            .append("rect")
            .attr("width", this.getBarWidth())
            .attr("class", "bar " + barSetName)
            .attr("id", (d) => {
                return this.barID(barSetName, d.varA, d.varB);
            })
            .attr("height", (d, i) => {
                return this.heightFromValue(d.v);
            })
            .attr("x", (d, i) => {
                return xPos
            })
            .attr("y", (d, i) => {
                return this.barY(d, i, binsArray)
            })
            .style("fill-opacity", this.BARNORMALOPACITY)
            .style("fill", (d) => {
                return this.aColors[d.varA];
            })
            .attr("stroke", "white")
            // .style("border-color", "white")
            .on("mouseover",(d) => {
                this.setSelectionText(barSetName, d);
                d.barSetName = barSetName;
                this.barOnMouseOver(d, this);
            })
            .on("mouseleave", (d) => {
                d.barSetName = barSetName;
                this.barOnMouseout(d, this)
            })
    }

    cubicBezier (pt1, pt2) {
        return (pt2[0]/2) + ",0 " + 
               (pt2[0]/2) +  "," + pt2[1] + " " + 
               pt2[0] + "," + pt2[1] + " "
    }

    //creates the "d" attribute for a link element
    createLinkPathD(aBar, bBar) {
        var pts = []
        pts.push([Number(aBar.attr("x")) + Number(aBar.attr("width")), Number(aBar.attr("y"))])
        pts.push([Number(bBar.attr("x")) - pts[0][0], Number(bBar.attr("y")) - pts[0][1]])
        pts.push([0, Number(bBar.attr("height"))]);
        pts.push([ pts[0][0] - Number(bBar.attr("x")), 
                   Number(aBar.attr("y")) + Number(aBar.attr("height")) - 
                         (Number(bBar.attr("y")) + Number(bBar.attr("height")))]);

        var d = "M" + pts[0][0] + "," + pts[0][1] + 
                 "c" + this.cubicBezier(pts[0], pts[1]) + 
                 "l" + pts[2][0] + "," + pts[2][1] + " " + 
                 "c" + this.cubicBezier(pts[2], pts[3]);
        return d;
    }

    linkPathID (varA, varB) {
        return "link" + varA + "_" + varB;
    }

    //creates a link path for a given pair of a and b bars
    createLinkPath(aBar, bBar) {
        var d0 = this.createLinkPathD(aBar, bBar);
        var varA = aBar.data()[0].varA;
        var varB = aBar.data()[0].varB;
        this.svg.append("path")
                .data([{varA : varA, varB : varB}, {aBar: aBar, bBar: bBar}])
                .attr("d", d0)
                .attr("id", this.linkPathID(varA, varB))
                .attr("class", "link")
                .style("fill", aBar.style("fill"))
                .style("fill-opacity", this.LINKOPACITY)
    }

    // returns a d3 transition of duration 500
    t() {
        return d3.transition().duration(500);
    }

    //udpate the link paths, uses the height of bars
    updateLinkPaths() {
        for(var aInd in this.aOrder) {
            for (var bInd in this.bOrder) {
                var aBar = d3.select("#" + this.barID("ABars", this.aOrder[aInd], this.bOrder[bInd]));
                var bBar = d3.select("#" + this.barID("BBars", this.aOrder[aInd], this.bOrder[bInd]));
                var selected = this.svg.select("#" + this.linkPathID(aBar.data()[0].varA, aBar.data()[0].varB));
                selected.transition(this.t()).attr("d", this.createLinkPathD(aBar, bBar));
            }
        }
    }

    //creates the links between bars across the bipartide graphs
    createLinks() {
        for(var aInd in this.aOrder) {
            for (var bInd in this.bOrder) {
                var aBar = d3.select("#" + this.barID("ABars", this.aOrder[aInd], this.bOrder[bInd]));
                var bBar = d3.select("#" + this.barID("BBars", this.aOrder[aInd], this.bOrder[bInd]));
                this.createLinkPath(aBar, bBar)
            }
        }
    }
}

