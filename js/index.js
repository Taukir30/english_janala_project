//function for calling level api 
const loadLevels = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")        //fetch with then chaining
        .then(res => res.json())
        .then(data => showLevels(data.data));
}
loadLevels();

//function for loading buttons in level section according to the api data
const showLevels = (levels)=>{
    let levelContainer = document.getElementById('level_container');    //getting the container
    levelContainer.innerHTML = "";                                      //making the container empty

    for( let level of levels ){                                         //looping the data array

        let btnDiv = document.createElement('div');                     //creating buttons element
        btnDiv.innerHTML = `<button onclick="loadWords(${level.level_no})" id="btn_level${level.level_no}" class="btn btn_levels text-[#422AD5] bg-[#EDF6FF] hover:bg-[#ddd8ff] ">
                                <i class="fa-solid fa-book-open"></i>
                                Lesson -${level.level_no}
                            </button>`
        levelContainer.append(btnDiv)
    }
}

//function for calling words api 
const loadWords = (id)=>{                                               //taking input of button id as level no.
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)       //calling api as before
        .then( res => res.json() )
        .then( json => showWords(json.data) );
    
    // let btnLevel = document.getElementById(`btn_level${id}`);
    // console.log(btnLevel)
    toggleActive(`btn_level${id}`);                                     //calling toggleActive function with button id
}

//function for toggling active button class
function toggleActive(id){                                              //taking button id input
    let levelBtns = document.querySelectorAll('.btn_levels');           //getting all level button using querySelectorAll
    levelBtns.forEach( btn => btn.classList.remove('active') );         //looping through using forEach and removing active class
    document.getElementById(id).classList.add('active');                //adding active class to the clicked button using id
}

//function for loading words into the dom according to the api data
const showWords = (words)=>{
    let wordContainer = document.getElementById('word_container');
    wordContainer.innerHTML = "";

    let cardHolder = document.createElement('div');
    cardHolder.classList.add('card_holder', 'w-full', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-5');
    
    // for empty lesson array
    if( words.length === 0 ){
        wordContainer.innerHTML = `<img src="./assets/alert-error.png" alt="error" class="my-5 mx-auto">
                                <p class="text-xs text-gray-600 p-5">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                                <h2 class="mb-5 text-2xl font-semibold">নেক্সট Lesson এ যান</h2>`;
    }

    //looping the array and dynamic card
    for( let word of words ){

        cardHolder.innerHTML += `<div class="card bg-white p-8 shadow-sm">
                                <h2 class="text-xl font-bold inter my-3">${word.word? word.word:"not found" }</h2>
                                <p class="text-xs font-semibold ">Meaning /Pronounciation</p>
                                <h2 class="text-xl font-bold siliguri text-gray-600 my-5 flex-grow-1">"${word.meaning? word.meaning:"not found"} / ${word.pronunciation? word.pronunciation:"not found"}"</h2>
                                <div class="card_bottom flex justify-between mt-5">
                                    <div onclick="loadDetail(${word.id})" class="btn_left p-2 bg-[#E8F4FF] hover:cursor-pointer hover:bg-[#bee0ff] rounded-md"><i class="fa-solid fa-circle-info"></i></div>
                                    <div onclick="pronounceWord('${word.word}')" class="btn_right p-2 bg-[#E8F4FF] hover:cursor-pointer hover:bg-[#bee0ff] rounded-md"><i class="fa-solid fa-volume-high"></i></div>
                                </div>
                            </div>`;
    }
    wordContainer.append(cardHolder);                               //appending cardholder to dom
}

//function for loading word detail from api
const loadDetail = async(id) => {
    let response = await fetch(`https://openapi.programming-hero.com/api/word/${id}`);
    let detail = await response.json();
    showDetail(detail.data);
}

//function for showing detail in modal
const showDetail = (details) => {
    let modalBox = document.getElementById('modal_box');

    modalBox.innerHTML = `<div class="w-full bg-white rounded-xl p-6 space-y-4">
                            <!-- Word Title -->
                            <h2 class="text-xl font-bold text-gray-800">
                                ${details.word} <span class="text-gray-500 text-lg">(${details.pronunciation})</span>
                            </h2>

                            <!-- Meaning -->
                            <div>
                                <p class="text-sm font-semibold text-black">Meaning</p>
                                <p class="text-gray-800">${details.meaning}</p>
                            </div>

                            <!-- Example -->
                            <div>
                                <p class="text-sm font-semibold text-black">Example</p>
                                <p class="text-gray-700">${details.sentence}</p>
                            </div>

                            <!-- Synonyms -->
                            <div>
                                <p class="text-sm font-semibold text-black mb-2">সমার্থক শব্দ গুলো</p>
                                <div class="flex flex-wrap gap-2">
                                    ${synonyms(details.synonyms)}
                                </div>
                            </div>

                            <div class="modal-action">
                                <form method="dialog">
                                    <!-- if there is a button in form, it will close the modal -->
                                    <button class="btn bg-[#422AD5] text-white">Complete Learning</button>
                                </form>
                            </div>
                        </div>`

    document.getElementById('word_modal').showModal()

}

//function for converting synonames from array to single string
const synonyms = (arr) => {
    return arr.map( syno => `<span class="px-3 py-1 bg-gray-100 border rounded-md text-sm text-gray-700">${syno}</span>` ).join("");
}

//speaker function
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}

// spiner, search add korte hobe module-33.9, 33.10, 33.11