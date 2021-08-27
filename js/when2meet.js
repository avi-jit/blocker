// view-source:https://www.when2meet.com/

function MouseDownDate(Row, Column) {
    IsMouseDownDates = true;
    AnchorRow = Row;
    AnchorColumn = Column;
    HoverRow = Row;
    HoverColumn = Column;
    if (ArraySearch(Dates, document.getElementById("DateOf-" + Row + "-" +
        Column).value)) {
        WriteMode = "erase";
    } else {
        WriteMode = "write";
    }
    ReColor();
}

function ReColor() {
    for (Row = 1; Row <= 6; Row++) {
        for (Column = 1; Column <= 7; Column++) {
            if ((WriteMode != "") && ((AnchorRow - Row) * (Row - HoverRow) >= 0) && ((AnchorColumn - Column) * (Column - HoverColumn) >= 0)) {

                if (WriteMode == "write") {
                    document.getElementById("Day-" + Row + "-" + Column).style.backgroundColor = 'green';
                    document.getElementById("Day-" + Row + "-" + Column).style.color = 'white';
                } else {
                    document.getElementById("Day-" + Row + "-" + Column).style.backgroundColor = '#ffdede';
                    document.getElementById("Day-" + Row + "-" + Column).style.color = 'black';
                }
                document.getElementById("Day-" + Row + "-" + Column).style.border = '0px solid black';
                document.getElementById("Day-" + Row + "-" + Column).style.padding = '4px';
                document.getElementById("Day-" + Row + "-" + Column).style.margin = '0px';
            } else {
                document.getElementById("Day-" + Row + "-" + Column).style.border = '1px solid black';
                document.getElementById("Day-" + Row + "-" + Column).style.padding = '2px';
                document.getElementById("Day-" + Row + "-" + Column).style.margin = '1px';

                if (ArraySearch(Dates, document.getElementById("DateOf-" + Row + "-" + Column).value)) {
                    document.getElementById("Day-" + Row + "-" + Column).style.backgroundColor = 'green';
                    document.getElementById("Day-" + Row + "-" + Column).style.color = 'white';
                } else {
                    document.getElementById("Day-" + Row + "-" + Column).style.backgroundColor = '#ffdede';
                    document.getElementById("Day-" + Row + "-" + Column).style.color = 'black';
                }

            }
        }
    }
}

// view-source:https://www.when2meet.com/?12593793-aemaM
