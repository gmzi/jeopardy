function jeopardy() {
  let categories = [];

  async function fillTable() {
    const th = document.querySelectorAll('th');
    const $tr = $('tbody tr');

    for (let i = 0; i < categories.length; i++) {
      th[i].innerText = categories[i].title;

      for (let j = 0; j < categories.length; j++) {
        if (!$tr.get()[i]) {
          // console.log(`tr.get()[${i}] returned null or undefined`);
          continue;
        } else {
          // Basic loop structure: $tr.get()[i].children[j].innerText = categories[j].clues[i].question;
          if (categories[j].clues[i].showing === null) {
            fillTableHelper($tr, i, j);
          }
        }
      }
    }
  }

  function fillTableHelper(tr, i, j) {
    tr.get()[i].children[j].innerText = ' $800 ';
    tr.get()[i].children[j].style.color = 'rgb(250, 185, 0)';

    tr.get()[i].children[j].addEventListener('click', function (evt) {
      evt.target.innerText = categories[j].clues[i].question;
      categories[j].clues[i].showing = 'question';
      tr.get()[i].children[j].style.color = 'whitesmoke';
      if (categories[j].clues[i].showing === 'question') {
        tr.get()[i].children[j].addEventListener('click', function (evt) {
          evt.target.innerText = categories[j].clues[i].answer;
          evt.target.style.backgroundColor = ' rgb(3, 75, 120)';
          categories[j].clues[i].showing = 'answer';
        });
      }
    });
  }

  function makeRestartBtn() {
    $(
      '<p id="instructions">–click once for the question, click again for the answer–</p>'
    ).appendTo('h1');
    $('<button id="restart">New game</button>')
      .appendTo('body')
      .on('click', function () {
        location.reload();
      });
  }

  function hideLoadingView() {
    const h1 = document.querySelector('#title');
    const spinner = document.querySelector('.spin');
    const table = document.querySelector('table');
    h1.classList.remove('hide');
    table.classList.remove('hide');
    spinner.classList.add('hide');

    makeRestartBtn();
  }

  async function getData() {
    for (let i = 0; i < 6; i++) {
      const category = await axios.get(
        `https://jservice.io/api/category?id=${shuffler()}`
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
    hideLoadingView();
  }

  function showLoadingView() {
    const h1 = document.querySelector('#title');
    const table = document.querySelector('table');
    h1.classList.add('hide');
    table.classList.add('hide');
    getData();
  }

  async function setupAndStart() {
    $('<h1 id="title">Jeopardy!</h1>').appendTo('body');
    $('<button id="btn-start">Ready / Go</button>').appendTo('body');
    $('#btn-start').on('click', function () {
      $('<div class="spin"></div>').appendTo('body');
      $('#btn-start').remove();
      // showLoadingView();
      spreadTable();
    });
  }

  function shuffler() {
    let number = _.shuffle([
      Math.floor(Math.random() * 9),
      Math.floor(Math.random() * 9),
      Math.floor(Math.random() * 9),
      Math.floor(Math.random() * 9),
    ]);
    return number.join('');
  }

  async function spreadTable() {
    const $table = $(`<table class="table table-bordered table-primary">
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
    $table.appendTo('body');

    showLoadingView();
  }

  setupAndStart();
}

jeopardy();
