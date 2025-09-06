//function for calling api
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

        let btnDiv = document.createElement('div');                     //creating buttons
        btnDiv.innerHTML = `<button onclick="loadWords(${level.level_no})" class="btn text-[#422AD5] bg-[#EDF6FF] hover:bg-[#ddd8ff] focus:bg-[#c1b8ff] border-[#422AD5]">
                                <i class="fa-solid fa-book-open"></i>
                                Lesson -${level.level_no}
                            </button>`
        levelContainer.append(btnDiv)
    }
}

//function for calling words api 
const loadWords = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then( res => res.json() )
        .then( json => showWords(json.data) )
}

//function for loading words into the dom according to the api data
const showWords = (words)=>{
    let wordContainer = document.getElementById('word_container');
    wordContainer.innerHTML = "";
    let cardHolder = document.createElement('div');
    cardHolder.classList.add('card_holder', 'w-full', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-5');
    
    // console.log(words.length)
    if( words.length === 0 ){
        wordContainer.innerHTML = `<img src="./assets/alert-error.png" alt="error" class="my-5 mx-auto">
                                <p class="text-xs text-gray-600 p-5">আপনি এখনো কোন Lesson Select করেন নি</p>
                                <h2 class="mb-5 text-2xl font-semibold">একটি Lesson Select করুন।</h2>`;
    }
    for( let word of words ){

        cardHolder.innerHTML += `<div class="card bg-white p-8">
                                <h2 class="text-xl font-bold inter my-3">${word.word}</h2>
                                <p class="text-xs font-semibold ">Meaning /Pronounciation</p>
                                <h2 class="text-xl font-bold siliguri text-gray-600 my-5">"${word.meaning} / ${word.pronunciation}"</h2>
                                <div class="card_bottom flex justify-between mt-5">
                                    <div class="btn_left p-2 bg-gray-200 hover:cursor-pointer rounded-md"><i class="fa-solid fa-circle-info"></i></div>
                                    <div class="btn_right p-2 bg-gray-200 hover:cursor-pointer rounded-md"><i class="fa-solid fa-volume-high"></i></div>
                                </div>
                            </div>`;

    }

    wordContainer.append(cardHolder);

    

}