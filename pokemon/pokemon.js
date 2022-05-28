'use strict'

// json url 가져오는 변수
const requestURL = './data/pokemonList.json';

// 요청을 만들기 위해, XMLHttpRequest 생성자로부터 새로운 request 인스턴스 생성
const request = new XMLHttpRequest();

// open() 메서드로 새로운 요청 생성함
request.open('GET', requestURL);

// responseType을 json으로 설정함
// XHR로 하여금 서버가 json 데이터를 반환할 것이며, js 객체로 변환될 것이라는 걸 명시함
request.responseType = 'json';

// send() 메서드로 요청 보냄
request.send();

// request.onload 로 서버의 응답을 기다린 후 함수 실행함
request.onload = function() {
  // response 프로퍼티를 사용하여, json 데이터에 기반한 js 객체를 변수에 저장함
  const pokemonList = request.response;

  const list = document.querySelector('ul.wrap_list');
  const searchInput = document.querySelector('input.searchbar');
  const searchBtn = document.querySelector('button.btn_search');
  const totalBtn = document.querySelector('button.btn_total');

  // fn) 리스트 생성
  function createElement(idx) {
    const li = document.createElement('li');
    const pokemon = pokemonList[idx];

    li.innerHTML = `
      <img src='${pokemon.url}' alt='${pokemon.name}'>
      <br/><span class='txt_name'>${pokemon.name}</span>
    `
  
    list.appendChild(li);
  }

  // fn) 전체 리스트 보여주기
  function showTotalList() {
    list.innerHTML = '';

    let i = 0;
    for (i; i < pokemonList.length; i++) {
      createElement(i);
    }
  }

  // fn) 검색어 검증
  function showList(txt) {
    list.innerHTML = ''; // 검색 후 담겨진 리스트를 초기화
  
    if(txt !== '') {
      for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];

        if(pokemon.name.includes(txt)) {
          createElement(i);
        }
      }
    } else alert('포켓몬 이름을 입력하세요.');
  }
  
  // fn) 검색 이벤트 실행
  function executeEvent() {

    // 포켓몬 이름 검색하기
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const txt = searchInput.value;
      showList(txt);
    })

    // 전체 리스트 보기
    totalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showTotalList();
    })
  }

  function init() {
    executeEvent();
  }

  init();
}