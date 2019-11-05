
$.get("data", function (data) {
    console.log(data);

    acrossCluesDiv = $("#acrossCluesDiv")
    downCluesDiv = $("#downCluesDiv")
    clues = data.clues
    cells = data.cells

    // Append clues
    for (i = 0; i < clues.length; i++) {
        clue = clues[i]

        if (clue.direction === 0) { // Across
            html = '<dd class="crossword-clues__list-item crossword-clues__list-item--across-' + clue.number + '" data-number="' + clue.number + '">' + clue.text + '</dd>'
            acrossCluesDiv.append(html)
        } else { // Down
            html = '<dd class="crossword-clues__list-item crossword-clues__list-item--down-' + clue.number + '" data-number="' + clue.number + '">' + clue.text + '</dd>'
            downCluesDiv.append(html)
        }
    }

    // Append cells
    cellsDiv = $("#cellsDiv")
    for (i = 0; i < cells.length; i++) {
        cell = cells[i]

        html = ''
        if (cell.isBlack) { // Black cell
            html = '<span class="crossword-board__item--blank" id="item' + (cell.i + 1) + '-' + (cell.j + 1) + '"></span>'
        } else { // Letter
            html = '<input value="" id="item' + (cell.i + 1) + '-' + (cell.j + 1) + '" class="crossword-board__item" type="text" minlength="1" maxlength="1" pattern="^[' + cell.letter + ']{1}$" required="required" value="" />'
            htmlRevealed = '<input value="' + cell.letter + '" id="item' + (cell.i + 1) + '-' + (cell.j + 1) + '" class="crossword-board__item" type="text" minlength="1" maxlength="1" pattern="^[' + cell.letter + ']{1}$" required="required" value="" />'
        }
        cellsDiv.append(html)
    }

    // Append labels
    labelsDiv = $("#labelsDiv")
    for (i = 0; i < cells.length; i++) {
        cell = cells[i]
        if (cell.number !== -1) {
            html = '<span id="label-1" class="crossword-board__item-label crossword-board__item-label--1" style="grid-column: ' + (cell.j + 1) + '/' + (cell.j + 1) + ';grid-row: ' + (cell.i + 1) + '/' + (cell.i + 1) + ';"><span class="crossword-board__item-label-text">' + cell.number + '</span></span>'
            labelsDiv.append(html)
        }
    }
})

// Set date
n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
$("#date").html(m + "/" + d + "/" + y)

function reveal()
{
    cellsDiv = $("#cellsDiv")
    $.get("data", function (data) {
        // Append cells
        for (i = 0; i < cells.length; i++) {
            cell = cells[i]
    
            html = ''
            if (cell.isBlack) { // Black cell
                html = '<span class="crossword-board__item--blank" id="item' + (cell.i + 1) + '-' + (cell.j + 1) + '"></span>'
            } else { // Letter
                html = '<input value="" id="item' + (cell.i + 1) + '-' + (cell.j + 1) + '" class="crossword-board__item" type="text" minlength="1" maxlength="1" pattern="^[' + cell.letter + ']{1}$" required="required" value="" />'
                htmlRevealed = '<input value="' + cell.letter + '" id="item' + (cell.i + 1) + '-' + (cell.j + 1) + '" class="crossword-board__item" type="text" minlength="1" maxlength="1" pattern="^[' + cell.letter + ']{1}$" required="required" value="" />'
                tmp = "item" + (cell.i + 1) + "-" + (cell.j + 1)
                $("#" + tmp).replaceWith(htmlRevealed)
            }   
        }
    })
}