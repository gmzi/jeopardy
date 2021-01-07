// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds() {}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

function getCategory(catId) {}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  console.log(categories);
  const th = document.querySelectorAll('th');
  const $tr = $('tbody tr');

  for (let i = 0; i < categories.length; i++) {
    // console.log($tr.get()[i]);
    th[i].innerText = categories[i].title;
    for (let j = 0; j < categories.length; j++) {
      if (!$tr.get()[i]) {
        console.log('to fix');
      } else {
        // handleClick($tr.get()[i].children[j]);
        // $tr.get()[i].children[j].innerText = categories[j].clues[i].question;
        if (categories[j].clues[i].showing === null) {
          $tr.get()[i].children[j].innerText = '?';
          $tr.get()[i].children[j].addEventListener('click', function (evt) {
            evt.target.innerText = categories[j].clues[i].question;
            categories[j].clues[i].showing = 'question';
            if (categories[j].clues[i].showing === 'question') {
              $tr
                .get()
                [i].children[j].addEventListener('click', function (evt) {
                  evt.target.innerText = categories[j].clues[i].answer;
                  categories[j].clues[i].showing = 'answer';
                });
            }
          });
        }
      }
    }
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  //   const category = await axios.get(
  //     `http://jservice.io/api/category?id=${shuffler()}`
  //   );
  //   console.log(category.data.clues);
  //   const clues = await axios.get('http://jservice.io/api/clues', {
  //     params: { count: 100, offset: shuffler() },
  //   });

  $('<h1>Jeopardy</h1>').appendTo('body');
  $('<button id="btn-start">Start</button>').appendTo('body');
  $('#btn-start').on('click', function () {
    const table = $(`<table class="table">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>`);
    table.appendTo('body');
    $('#btn-start').remove();
    $('<button id="restart">Play again</button>')
      .appendTo('body')
      .on('click', function () {
        location.reload();
      });

    getData();
  });
}

async function getData() {
  for (let i = 0; i < 6; i++) {
    const category = await axios.get(
      `http://jservice.io/api/category?id=${shuffler()}`
    );

    let obj = {
      title: category.data.title,
      clues: category.data.clues,
    };
    obj.clues.forEach(function (clue) {
      clue.showing = null;
    });
    categories.push(obj);
  }
  fillTable();
}

setupAndStart();

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO

function shuffler() {
  let number = _.shuffle([
    Math.floor(Math.random() * 9),
    Math.floor(Math.random() * 9),
    Math.floor(Math.random() * 9),
    Math.floor(Math.random() * 9),
  ]);
  return number.join('');
}
