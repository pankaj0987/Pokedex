let popup = document.querySelector(".popup");
let container = document.querySelector(".container");

popup.style.display = "none";

const fetchpokemon = (start, generation) => {

  const promises = [];
  for (i = start; i <= generation; i++) {
    const url = ` https://pokeapi.co/api/v2/pokemon/${i}/`;


    promises.push(fetch(url)
      .then(res => {
        return res.json();
      }))

  }


  Promise.all(promises).then(results => {

    const pokemon = results.map(element => ({

      id: element.id,
      name: element.name,
      images: element.sprites.front_default,
      type: element.types.map(type => type.type.name)


    }));

    showpokemon(pokemon);
  });

}

fetchpokemon(1,151);



document.querySelector(".change-buttons").addEventListener("click", function (e) {
  let items = document.querySelectorAll(".items");

  Array.from(items).forEach(element => {

    element.remove();
  })
  if (e.target.className == "change-1") {

    fetchpokemon(1, 151);

  }

  else if (e.target.className == "change-2") {

    fetchpokemon(152, 251);

  }
  else if (e.target.className == "change-3") {
  
    fetchpokemon(252, 386);

  }
  else if (e.target.className == "change-4") {
    fetchpokemon(387, 494);

  }
  else if (e.target.className == "change-5") {
    fetchpokemon(494, 649);

  }
  else if (e.target.className == "change-6") {
    fetchpokemon(650, 721);

  }

})
// document.querySelector(".change-1").addEventListener("click",function () {
//   let items=document.querySelectorAll(".items");
//   Array.from(items).forEach(element=>{
//     element.remove();
//   })
//   a= 40;
//   fetchpokemon(40)
// })






function showpokemon(pokemon) {


  pokemon.forEach(data => {

    let html = ""
    if (data.type.length == 2) {



      html += `
    <div class="items">
    <div class="img">
    <img src=${data.images} alt="">
</div>
<div class="details">
    <small class="id">#${data.id}</small>
    <a class="name" href="#" id="${data.id}" >${data.name}</a>
    <div class="typediv">
        <a href="#" class="type type-1 ${data.type[0]}">${data.type[0]}</a><a href="#" class="type tupe-2 ${data.type[1]}">${data.type[1]}</a>
    </div>
</div>
</div>
    
    `;

    }
    else {
      html += `
    <div class="items" >
    <div class="img">
    <img src=${data.images} alt="">
</div>
<div class="details">
    <small class="id" id="${data.id}">#${data.id}</small>
    <a class="name name-${data.id}" href="#" id="${data.id}">${data.name}</a>
    <div class="typediv">
        <a href="#" class="type type-1 ${data.type[0]}">${data.type[0]}</a><a href="#" class="type tupe-2 "></a>
    </div>
</div>
</div>
    
    `;

    }
    let addhtml = document.querySelector(".container");
    addhtml.innerHTML += html;
  })

}


container.addEventListener('click', function (e) {
  if (e.target.localName == "a") {
    let id = e.target.id;

    const url = ` https://pokeapi.co/api/v2/pokemon/${id}/`;
    const url2 = ` https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    const url3 = `https://pokeapi.co/api/v2/evolution-chain/${id}/`;
    const image = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`

    fetch(url).then(res => {
      return res.json();
    }).then(data => {

      let movearray = [];

      data.moves.forEach((element, index) => {

        if (element.version_group_details.length > 2) {
          let v = element.version_group_details[element.version_group_details.length - 2]


          const moves = {
            move: element.move.name,
            url: element.move.url,
            level: v.level_learned_at
          }
          movearray.push(moves)
        }
        else {
          let v = element.version_group_details[element.version_group_details.length - 1]


          const moves = {
            move: element.move.name,
            url: element.move.url,
            level: v.level_learned_at
          }
          movearray.push(moves)
        }

      })

      let levelarray = [];
      movearray.forEach(element2 => {
        if (element2.level > 0) {
          levelarray.push(element2.level)
        }
      })
      levelarray = levelarray.sort(function (a, b) { return a - b });
      let newlevel = [...new Set(levelarray)];

      let rightmoves = [];
      newlevel.forEach(element3 => {

        movearray.forEach(element4 => {
          if (element3 == element4.level) {
            const newmoves = {
              move: element4.move,
              url: element4.url,
              level: element4.level
            }
            rightmoves.push(newmoves)

          }
        })

      })




      fetch(url2).then(res2 => {
        return res2.json();
      }).then(data2 => {
        const url3 = data2.evolution_chain.url;
        let species = data2.genera[7].genus;





        let html = ""
        if (data.abilities.length == 2 && data.types.length == 2) {
          html += `
     <button class="closebtn" onclick="closebtn()"><i class="fas fa-window-close"></i></button>
     <div class="details">
         <h1>${data.name}</h1>
         <div class="singleimage">
         <img src=${image} alt="">
         </div>
         <p>${data.name} is a <span class="${data.types[0].type.name}">${data.types[0].type.name}</span>/<span class="${data.types[1].type.name}">${data.types[1].type.name}</span> type pokemon introduced in ${data2.generation.name}.It is known as a '${species}'</p>
     </div>
     <div class="sub-details">
        <div class="pkmndata">
        <h1>Pokedex Data</h1>
        <table>
        <tr>
          <th>ID</th>
          <td>${data.id}</td>
        </tr>
        <tr>
          <th>Type</th>
          <td><span class="${data.types[0].type.name}">${data.types[0].type.name}</span> , <span class="${data.types[1].type.name}">${data.types[1].type.name}</span></td>
          
        </tr>
        <tr>
          <th>Species</th>
          <td>${species}</td>
        </tr>
        <tr>
          <th>Height</th>
          <td>${data.height}</td>
        </tr>
        <tr>
          <th>Weight</th>
          <td>${data.weight}</td>
        </tr>
        <tr>
        <th>Abilities</th>
        <td>${data.abilities[0].ability.name}<br>
        ${data.abilities[1].ability.name}<span class="hidden">(hidden)</span>
        </td>
      </tr>

      </table>
        </div>
        <div class="effective">
        <h1>Base Stats</h1>
        <table >
        <tr>
        <th class="stats-heading">Stats</th>
       <th class="stats-heading">Base stats</th>

      </tr>
        <tr>
<th>HP</th>
<td class="cell-num">${data.stats[0].base_stat}</td>

</tr>
        <tr>
          <th>Attack</th>
          <td class="cell-num">${data.stats[1].base_stat}</td>

        </tr>
        <tr>
        <th>Defence</th>
        <td class="cell-num">${data.stats[2].base_stat}</td>
 
      </tr>
      <tr>
      <th>Spc. Atk</th>
      <td class="cell-num">${data.stats[3].base_stat}</td>

    </tr>
    <tr>
    <th>Spc. Def</th>
    <td class="cell-num">${data.stats[4].base_stat}</td>

  </tr>
  <tr>
  <th>Speed</th>
  <td class="cell-num">${data.stats[5].base_stat}</td>

</tr>

      </table>
        </div>
     </div>
     
     `}
        if (data.abilities.length == 3 && data.types.length == 2) {
          html += `
          <button class="closebtn" onclick="closebtn()"><i class="fas fa-window-close"></i></button>
     <div class="details">
         <h1>${data.name}</h1>
         <div class="singleimage">
         <img src=${image}  alt="">
         </div>
         <p>${data.name} is a <span class="${data.types[0].type.name}">${data.types[0].type.name}</span>/<span class="${data.types[1].type.name}">${data.types[1].type.name}</span> type pokemon introduced in ${data2.generation.name}.It is known as a'${species}'</p>
     </div>
     <div class="sub-details">
        <div class="pkmndata">
        <table>
        <tr>
          <th>ID</th>
          <td>${data.id}</td>
        </tr>
        <tr>
          <th>Type</th>
          <td><span class="${data.types[0].type.name}">${data.types[0].type.name}</span> , <span class="${data.types[1].type.name}">${data.types[1].type.name}</span></td>
          
        </tr>
        <tr>
          <th>Species</th>
          <td>${species}</td>
        </tr>
        <tr>
          <th>Height</th>
          <td>${data.height}</td>
        </tr>
        <tr>
          <th>Weight</th>
          <td>${data.weight}</td>
        </tr>
        <tr>
        <th>Abilities</th>
        <td>${data.abilities[0].ability.name}<br>
        ${data.abilities[1].ability.name}<br>
        ${data.abilities[2].ability.name}<span class="hidden">(hidden)</span>
        </td>
      </tr>

      </table>
      </div>
      <div class="effective">
      <table>
      <tr>
      <th class="stats-heading">Stats</th>
     <th class="stats-heading">Base stats</th>

    </tr>
      <tr>
<th>HP</th>
<td class="cell-num">${data.stats[0].base_stat}</td>

</tr>
      <tr>
        <th>Attack</th>
        <td class="cell-num">${data.stats[1].base_stat}</td>

      </tr>
      <tr>
      <th>Defence</th>
      <td class="cell-num">${data.stats[2].base_stat}</td>

    </tr>
    <tr>
    <th>Spc. Atk</th>
    <td class="cell-num">${data.stats[3].base_stat}</td>

  </tr>
  <tr>
  <th>Spc. Def</th>
  <td class="cell-num">${data.stats[4].base_stat}</td>

</tr>
<tr>
<th>Speed</th>
<td class="cell-num">${data.stats[5].base_stat}</td>

</tr>

    </table>
        </div>
     </div>
     
     `}

        if (data.abilities.length == 1 && data.types.length == 2) {
          html += `
          <button class="closebtn" onclick="closebtn()"><i class="fas fa-window-close"></i></button>
 <div class="details">
     <h1>${data.name}</h1>
     <div class="singleimage">
     <img src=${image}  alt="">
     </div>
     <p>${data.name} is a <span class="${data.types[0].type.name}">${data.types[0].type.name}</span>/<span class="${data.types[1].type.name}">${data.types[1].type.name}</span> type pokemon introduced in ${data2.generation.name}.It is known as a'${species}'</p>
 </div>
 <div class="sub-details">
    <div class="pkmndata">
    <h1>Pokedex Data</h1>
    <table>
    <tr>
      <th>ID</th>
      <td>${data.id}</td>
    </tr>
    <tr>
      <th>Type</th>
      <td><span class="${data.types[0].type.name}">${data.types[0].type.name}</span> , <span class="${data.types[1].type.name}">${data.types[1].type.name}</span></td>
      
    </tr>
    <tr>
      <th>Species</th>
      <td>${species}</td>
    </tr>
    <tr>
      <th>Height</th>
      <td>${data.height}</td>
    </tr>
    <tr>
      <th>Weight</th>
      <td>${data.weight}</td>
    </tr>
    <tr>
    <th>Abilities</th>
    <td>${data.abilities[0].ability.name}<br>
   
    </td>
  </tr>

  </table>
  </div>
  <div class="effective">
  <h1>Base Stats</h1>
  <table>
  <tr>
  <th class="stats-heading">Stats</th>
 <th class="stats-heading">Base stats</th>

</tr>
  <tr>
<th>HP</th>
<td class="cell-num">${data.stats[0].base_stat}</td>

</tr>
  <tr>
    <th>Attack</th>
    <td class="cell-num">${data.stats[1].base_stat}</td>

  </tr>
  <tr>
  <th>Defence</th>
  <td class="cell-num">${data.stats[2].base_stat}</td>

</tr>
<tr>
<th>Spc. Atk</th>
<td class="cell-num">${data.stats[3].base_stat}</td>

</tr>
<tr>
<th>Spc. Def</th>
<td class="cell-num">${data.stats[4].base_stat}</td>

</tr>
<tr>
<th>Speed</th>
<td class="cell-num">${data.stats[5].base_stat}</td>

</tr>

</table>
    </div>
 </div>
 
 `}
        else if (data.abilities.length == 2 && data.types.length == 1) {
          html += `
          <button class="closebtn" onclick="closebtn()"><i class="fas fa-window-close"></i></button>
     <div class="details">
         <h1>${data.name}</h1>
         <div class="singleimage">
         <img src=${image}  alt="">
         </div>
         <p>${data.name} is a <span class="${data.types[0].type.name}">${data.types[0].type.name}</span> type pokemon introduced in ${data2.generation.name}.It is known as a '${species}'</p>
     </div>
     <div class="sub-details">
        <div class="pkmndata">
        <h1>Pokedex Data</h1>
        <table>
        <tr>
          <th>ID</th>
          <td>${data.id}</td>
        </tr>
        <tr>
          <th>Type</th>
          <td><span class="${data.types[0].type.name}">${data.types[0].type.name}</span>  <span class=""></span></td>
          
        </tr>
        <tr>
          <th>Species</th>
          <td>${species}</td>
        </tr>
        <tr>
          <th>Height</th>
          <td>${data.height}</td>
        </tr>
        <tr>
          <th>Weight</th>
          <td>${data.weight}</td>
        </tr>
        <tr>
        <th>Abilities</th>
        <td>${data.abilities[0].ability.name}<br>
        
        ${data.abilities[1].ability.name}<span class="hidden">(hidden)</span>
        </td>
      </tr>

      </table>
      </div>
      <div class="effective">
      <h1>Base Stats</h1>
      <table>
      <tr>
      <th class="stats-heading">Stats</th>
     <th class="stats-heading">Base stats</th>

    </tr>
      <tr>
<th>HP</th>
<td class="cell-num">${data.stats[0].base_stat}</td>

</tr>
      <tr>
        <th>Attack</th>
        <td class="cell-num">${data.stats[1].base_stat}</td>

      </tr>
      <tr>
      <th>Defence</th>
      <td class="cell-num">${data.stats[2].base_stat}</td>

    </tr>
    <tr>
    <th>Spc. Atk</th>
    <td class="cell-num">${data.stats[3].base_stat}</td>

  </tr>
  <tr>
  <th>Spc. Def</th>
  <td class="cell-num">${data.stats[4].base_stat}</td>

</tr>
<tr>
<th>Speed</th>
<td class="cell-num">${data.stats[5].base_stat}</td>

</tr>

    </table>
        </div>
     </div>
     
     `}
        else if (data.abilities.length == 1 && data.types.length == 1) {
          html += `
          <button class="closebtn" onclick="closebtn()"><i class="fas fa-window-close"></i></button>
 <div class="details">
     <h1>${data.name}</h1>
     <div class="singleimage">
     <img src=${image} alt="">
     </div>
     <p>${data.name} is a <span class="${data.types[0].type.name}">${data.types[0].type.name}</span> type pokemon introduced in ${data2.generation.name}.It is known as a '${species}'</p>
 </div>
 <div class="sub-details">
    <div class="pkmndata">
    <h1>Pokedex Data</h1>
    <table >
    <tr>
      <th>ID</th>
      <td>${data.id}</td>
    </tr>
    <tr>
      <th>Type</th>
      <td><span class="${data.types[0].type.name}">${data.types[0].type.name}</span>  <span class=""></span></td>
      
    </tr>
    <tr>
      <th>Species</th>
      <td>${species}</td>
    </tr>
    <tr>
      <th>Height</th>
      <td>${data.height}</td>
    </tr>
    <tr>
      <th>Weight</th>
      <td>${data.weight}</td>
    </tr>
    <tr>
    <th>Abilities</th>
    <td>${data.abilities[0].ability.name}<br>
    
   
    </td>
  </tr>

  </table>
  </div>
  <div class="effective">
  <h1>Base Stats</h1>
  <table>
  <tr>
  <th class="stats-heading">Stats</th>
 <th class="stats-heading">Base stats</th>

</tr>
  <tr>
<th>HP</th>
<td class="cell-num">${data.stats[0].base_stat}</td>

</tr>
  <tr>
    <th>Attack</th>
    <td class="cell-num">${data.stats[1].base_stat}</td>

  </tr>
  <tr>
  <th>Defence</th>
  <td class="cell-num">${data.stats[2].base_stat}</td>

</tr>
<tr>
<th>Spc. Atk</th>
<td class="cell-num">${data.stats[3].base_stat}</td>

</tr>
<tr>
<th>Spc. Def</th>
<td class="cell-num">${data.stats[4].base_stat}</td>

</tr>
<tr>
<th>Speed</th>
<td class="cell-num">${data.stats[5].base_stat}</td>

</tr>

</table>
    </div>
 </div>
 
 `}

        else if (data.abilities.length == 3 && data.types.length == 1) {
          html += `
          <button class="closebtn" onclick="closebtn()"><i class="fas fa-window-close"></i></button>
     <div class="details">
         <h1>${data.name}</h1>
         <div class="singleimage">
         <img src=${image}  alt="">
         </div>
         <p>${data.name} is a <span class="${data.types[0].type.name}">${data.types[0].type.name}</span> type pokemon introduced in ${data2.generation.name}.It is known as a '${species}'</p>
     </div>
     <div class="sub-details">
        <div class="pkmndata">
        <h1>Pokedex Data</h1>
        <table>
        <tr>
          <th>ID</th>
          <td>${data.id}</td>
        </tr>
        <tr>
          <th>Type</th>
          <td><span class="${data.types[0].type.name}">${data.types[0].type.name}</span>  <span class=""></span></td>
          
        </tr>
        <tr>
          <th>Species</th>
          <td>${species}</td>
        </tr>
        <tr>
          <th>Height</th>
          <td>${data.height}</td>
        </tr>
        <tr>
          <th>Weight</th>
          <td>${data.weight}</td>
        </tr>
        <tr>
        <th>Abilities</th>
        <td>${data.abilities[0].ability.name}<br>
        ${data.abilities[1].ability.name}<br>
        ${data.abilities[2].ability.name}<span class="hidden">(hidden)</span>
        </td>
      </tr>

      </table>
      </div>
      <div class="effective">
      <h1>Base Stats</h1>
      <table >
      <tr>
      <th class="stats-heading">Stats</th>
     <th class="stats-heading">Base stats</th>

    </tr>
      <tr>
<th>HP</th>
<td class="cell-num">${data.stats[0].base_stat}</td>

</tr>
      <tr>
        <th>Attack</th>
        <td class="cell-num">${data.stats[1].base_stat}</td>

      </tr>
      <tr>
      <th>Defence</th>
      <td class="cell-num">${data.stats[2].base_stat}</td>

    </tr>
    <tr>
    <th>Spc. Atk</th>
    <td class="cell-num">${data.stats[3].base_stat}</td>

  </tr>
  <tr>
  <th>Spc. Def</th>
  <td class="cell-num">${data.stats[4].base_stat}</td>

</tr>
<tr>
<th>Speed</th>
<td class="cell-num">${data.stats[5].base_stat}</td>

</tr>

    </table>
        </div>
     </div>
     
     `}



        let popup = document.querySelector(".popup");
        popup.innerHTML = html + popup.innerHTML;
        moveset(rightmoves);

        fetch(url3).then(res2 => {
          return res2.json();
        }).then(data3 => {
          createevolution(data3);
        })
      })
    })

    let popup = document.querySelector(".popup");

    popup.style.display = "block";
    let header = document.querySelector(".header");
    header.style.display = "none";
    let navbar = document.querySelector(".navbar");
    navbar.style.display = "none";
    let search=document.querySelector(".search")
    search.style.display="none";
    let container2 = document.querySelector(".moveset");
    container2.style.display = "none";
    let popup5 = document.querySelector(".moveset");
    popup5.style.display = "block";
    let container = document.querySelector(".container");
    container.style.display = "none";

  }
})

function closebtn() {
  let popup1 = document.querySelector(".details");
  let popup2 = document.querySelector(".sub-details");

  let popup3 = document.getElementsByClassName("row");
  let popup4 = document.querySelector(".closebtn");
  let evolvechart = document.querySelector(".evolution");

  let header = document.querySelector(".header");
  header.style.display = "flex";
  let navbar = document.querySelector(".navbar");
  navbar.style.display = "flex";
  let search=document.querySelector(".search")
  search.style.display="block";

  let chartcontainer = document.querySelector(".evolve-content");
  chartcontainer.style.display = "none";
  popup1.remove();
  popup2.remove();
  popup4.remove();
  evolvechart.remove();

  Array.from(popup3).forEach(element => {
    element.remove();

  })

  let popup5 = document.querySelector(".moveset");
  popup5.style.display = "none";



  let container = document.querySelector(".container");
  container.style.display = "grid";


}



function moveset(data) {


  const calls = data.length;



  const promises = [];
  for (i = 0; i < calls; i++) {
    const url2 = `${data[i].url}`;


    promises.push(fetch(url2)
      .then(res => {
        return res.json();
      }))

  }


  Promise.all(promises).then(results => {

    const movedetails = results.map(element => ({

      accuracy: element.accuracy,
      name: element.damage_class.name,
      power: element.power,
      type: element.type.name


    }));

    createmove(movedetails, data);
  });


}


function createmove(movedetails, data) {

  const calls = data.length;
  let container2 = document.querySelector(".moveset");
  container2.style.display = "flex";

  let rows = document.querySelector(".t-move");
  html = ""

  data.forEach(function (element, index) {
    html += `
          
              
          <tr class="row row-${index}">
            
          <td>${element.level}.</td>
          <td>${element.move}</td>
         
          </tr>
        


        

              `
  })
  rows.innerHTML += html;

  movedetails.forEach(function (element2, index) {
    html2 = ""
    if (element2.accuracy == null && element2.power > 0) {
      html2 = `
          <td><button class="${element2.type}">${element2.type}</button></td>
          <td>${element2.name}</td>
          <td>${element2.power}</td>
          <td>--</td>

              `
    }
    else if (element2.power == null && element2.accuracy > 0) {
      html2 = `
            <td><button class="${element2.type}">${element2.type}</button></td>
            <td>${element2.name}</td>
            <td>--</td>
            <td>${element2.accuracy}</td>

                `
    }
    else if (element2.power == null && element2.accuracy == null) {
      html2 = `
              <td><button class="${element2.type}">${element2.type}</button></td>
              <td>${element2.name}</td>
              <td>--</td>
              <td>--</td>
  
                  `
    }
    else {
      html2 = `
            <td><button class="${element2.type}">${element2.type}</button></td>
            <td>${element2.name}</td>
            <td>${element2.power}</td>
            <td>${element2.accuracy}</td>

                `
    }
    let row2 = document.querySelector(`.row-${index}`)
    row2.innerHTML += html2;
  })





}


function createevolution(data) {

  let firststage = [];
  let secondstge = [];



  if (data.chain.evolves_to.length > 0) {
    data.chain.evolves_to.forEach(first => {



      first.evolution_details.forEach(firstlvl => {



        if (firstlvl.min_level !== null) {
          const obj = {
            name: first.species.name,
            url: first.species.url,
            level: firstlvl.min_level
          }
          firststage.push(obj)
        }
        else if (firstlvl.item != null) {
          const obj = {
            name: first.species.name,
            url: first.species.url,
            item: firstlvl.item.name
          }
          firststage.push(obj)
        }
        else if (firstlvl.min_happiness != null) {

          const obj = {
            name: first.species.name,
            url: first.species.url,
            happy: firstlvl.min_happiness
          }
          firststage.push(obj)

        }
      })

      if (first.evolves_to.length > 0) {

        first.evolves_to.forEach(second => {


          second.evolution_details.forEach(secondlvl => {



            if (secondlvl.min_level != null) {

              const obj = {
                name: second.species.name,
                url: second.species.url,
                level: secondlvl.min_level
              }
              secondstge.push(obj)
            }
            else if (secondlvl.item != null) {
              const obj = {
                name: second.species.name,
                url: second.species.url,
                item: secondlvl.item.name
              }
              secondstge.push(obj)
            }
            else if (secondlvl.min_happiness != null) {

              const obj = {
                name: second.species.name,
                url: second.species.url,
                happy: secondlvl.min_happiness
              }
              secondstge.push(obj)
            }
          })

        })
      }
    })
  }
  else {
    firststage.push(data.chain.species.name)
    firststage.push(data.chain.species.url)


  }




  let evolvechain = {};
  if (firststage.length == 1 && secondstge.length == 1) {
    firststage.forEach(element => {
      secondstge.forEach(element2 => {
        if (element["level"] != undefined && element2["level"] != undefined) {

          evolvechain = {
            chain: {
              name: data.chain.species.name,
              url: data.chain.species.url,
              evolve: {
                name: element.name,
                url: element.url,
                level: element.level,
                item: null,
                happy: null,
                evolve: {
                  name: element2.name,
                  url: element2.url,
                  level: element2.level,
                  item: null,
                  happy: null
                }
              }
            }
          }

        }

        else if (element["level"] != undefined && element2["item"] != undefined) {

          evolvechain = {
            chain: {
              name: data.chain.species.name,
              url: data.chain.species.url,
              evolve: {
                name: element.name,
                url: element.url,
                level: element.level,
                item: null,
                happy: null,
                evolve: {
                  name: element2.name,
                  url: element2.url,
                  level: null,
                  item: element2.item,
                  happy: null
                }
              }
            }

          }

        }

        else if (element["level"] != undefined && element2["happy"] != undefined) {

          evolvechain = {
            chain: {
              name: data.chain.species.name,
              url: data.chain.species.url,
              evolve: {
                name: element.name,
                url: element.url,
                level: element.level,
                item: null,
                happy: null,
                evolve: {
                  name: element2.name,
                  url: element2.url,
                  level: null,
                  item: null,
                  happy: element2.happy
                }
              }
            }

          }

        }

        else if (element["happy"] != undefined && element2["level"] != undefined) {

          evolvechain = {
            chain: {
              name: data.chain.species.name,
              url: data.chain.species.url,
              evolve: {
                name: element.name,
                url: element.url,
                level: null,
                item: null,
                happy: element.happy,
                evolve: {
                  name: element2.name,
                  url: element2.url,
                  level: element2.level,
                  item: null,
                  happy: null
                }
              }
            }

          }

        }

        else if (element["happy"] != undefined && element2["item"] != undefined) {

          evolvechain = {
            chain: {
              name: data.chain.species.name,
              url: data.chain.species.url,
              evolve: {
                name: element.name,
                url: element.url,
                level: null,
                item: null,
                happy: element.happy,
                evolve: {
                  name: element2.name,
                  url: element2.url,
                  level: null,
                  item: element2.item,
                  happy: null
                }
              }
            }

          }

        }





      })


    })
  }

  else if (firststage.length == 1 && secondstge.length == 0) {

    firststage.forEach(element => {

      if (element["level"] != undefined) {
        evolvechain = {
          chain: {
            name: data.chain.species.name,
            url: data.chain.species.url,
            evolve: {
              name: element.name,
              url: element.url,
              level: element.level,
              item: null,
              happy: null
            }

          }
        }

      }

      else if (element["happy"] != undefined) {
        evolvechain = {
          chain: {
            name: data.chain.species.name,
            url: data.chain.species.url,
            evolve: {
              name: element.name,
              url: element.url,
              level: null,
              item: null,
              happy: element.happy
            }

          }
        }
      }

      else if (element["item"] != undefined) {
        evolvechain = {
          chain: {
            name: data.chain.species.name,
            url: data.chain.species.url,
            evolve: {
              name: element.name,
              url: element.url,
              level: null,
              item: element.item,
              happy: null
            }

          }
        }
      }

    })

  }


  else if (firststage.length == 2) {


    evolvechain = {
      chain: {
        name: data.chain.species.name,
        url: data.chain.species.url,


      }
    }

  }



  verifyevolve(evolvechain);








}


function verifyevolve(data) {

  if (data.chain["evolve"] == undefined) {
    let value = 0;
    createevolvehtml(data, value);
  }
  else if (data.chain["evolve"] != undefined && data.chain.evolve["evolve"] != undefined) {
    let value = 2;
    createevolvehtml(data, value);


  }
  else if (data.chain["evolve"] != undefined && data.chain.evolve["evolve"] == undefined) {
    let value = 1;
    createevolvehtml(data, value);

  }
}


function createevolvehtml(data, value) {

  if (value == 2) {
    const url = data.chain.url;
    const url2 = data.chain.evolve.url;
    const url3 = data.chain.evolve.evolve.url;

    fetch(url)
      .then(res => {
        return res.json()
      }).then(data2 => {


        fetch(url2).then(res => res.json()).then(data3 => {
          fetch(url3).then(res => res.json()).then(data4 => {



            html = ""
            if (data.chain.evolve.level != undefined && data.chain.evolve.evolve.item != undefined) {

              html = `
    <div  class="evolution">
    <img src="https://pokeres.bastionbot.org/images/pokemon/${data2.id}.png" alt="">
    <div>
     <i class="fas fa-long-arrow-alt-right"></i>
     <span>level ${data.chain.evolve.level}</span>
    </div>
    <img src="https://pokeres.bastionbot.org/images/pokemon/${data3.id}.png" alt="">
    <div>
     <i class="fas fa-long-arrow-alt-right"></i>
     <span>Use ${data.chain.evolve.evolve.item}</span>
    </div>
    <img src="https://pokeres.bastionbot.org/images/pokemon/${data4.id}.png" alt="">
 </div>
    `

              let evolvechart = document.querySelector(".evolve-content");
              evolvechart.style.display = "block";
              evolvechart.innerHTML += html;

            }


            else if (data.chain.evolve.level != undefined && data.chain.evolve.evolve.level != undefined) {

              html = `
      <div  class="evolution">
      <img src="https://pokeres.bastionbot.org/images/pokemon/${data2.id}.png" alt="">
      <div>
       <i class="fas fa-long-arrow-alt-right"></i>
       <span>level ${data.chain.evolve.level}</span>
      </div>
      <img src="https://pokeres.bastionbot.org/images/pokemon/${data3.id}.png" alt="">
      <div>
       <i class="fas fa-long-arrow-alt-right"></i>
       <span>level ${data.chain.evolve.evolve.level}</span>
      </div>
      <img src="https://pokeres.bastionbot.org/images/pokemon/${data4.id}.png" alt="">
   </div>
      `

              let evolvechart = document.querySelector(".evolve-content");
              evolvechart.style.display = "block";
              evolvechart.innerHTML += html;

            }


            else if (data.chain.evolve.happy != undefined && data.chain.evolve.evolve.item != undefined) {

              html = `
        <div  class="evolution">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${data2.id}.png" alt="">
        <div>
         <i class="fas fa-long-arrow-alt-right"></i>
         <span>high friendship </span>
        </div>
        <img src="https://pokeres.bastionbot.org/images/pokemon/${data3.id}.png" alt="">
        <div>
         <i class="fas fa-long-arrow-alt-right"></i>
         <span>use ${data.chain.evolve.evolve.item}</span>
        </div>
        <img src="https://pokeres.bastionbot.org/images/pokemon/${data4.id}.png" alt="">
     </div>
        `

              let evolvechart = document.querySelector(".evolve-content");
              evolvechart.style.display = "block";
              evolvechart.innerHTML += html;

            }



            else if (data.chain.evolve.level != undefined && data.chain.evolve.evolve.happy != undefined) {

              html = `
          <div  class="evolution">
          <img src="https://pokeres.bastionbot.org/images/pokemon/${data2.id}.png" alt="">
          <div>
           <i class="fas fa-long-arrow-alt-right"></i>
           <span>level ${data.chain.evolve.level}</span>
          </div>
          <img src="https://pokeres.bastionbot.org/images/pokemon/${data3.id}.png" alt="">
          <div>
           <i class="fas fa-long-arrow-alt-right"></i>
           <span>high friendship</span>
          </div>
          <img src="https://pokeres.bastionbot.org/images/pokemon/${data4.id}.png" alt="">
       </div>
          `

              let evolvechart = document.querySelector(".evolve-content");
              evolvechart.style.display = "block";
              evolvechart.innerHTML += html;

            }
          })
        })

      })
  }

  else if (value == 1) {
    const url = data.chain.url;
    const url2 = data.chain.evolve.url;


    fetch(url)
      .then(res => {
        return res.json()
      }).then(data2 => {


        fetch(url2).then(res => res.json()).then(data3 => {




          html = ""

          html = `
      <div  class="evolution">
      <img src="https://pokeres.bastionbot.org/images/pokemon/${data2.id}.png" alt="">
      <div>
       <i class="fas fa-long-arrow-alt-right"></i>
       <span>level ${data.chain.evolve.level}</span>
      </div>
      <img src="https://pokeres.bastionbot.org/images/pokemon/${data3.id}.png" alt="">

      
   </div>
      `

          let evolvechart = document.querySelector(".evolve-content");
          evolvechart.style.display = "block";
          evolvechart.innerHTML += html;



        })
      })


  }

  else if (value == 0) {





    html = ""

    html = `
      <div  class="evolution">
      <div>${data.chain.name} does not evolve</div>

      
   </div>
      `

    let evolvechart = document.querySelector(".evolve-content");
    evolvechart.style.display = "block";
    evolvechart.innerHTML += html;





  }



}






document.getElementById("search").addEventListener("keyup", function (e) {
  let str2=this.value;
  let str3="";
  console.log(str3)
  console.log(typeof(e.code))
 console.log(e)
  let list = document.querySelectorAll(".items");


if(e.code==="Backspace"){
  console.log("open")
  console.log(str2)
   if(str2!==""){
    for (let i = 0; i < list.length; i++) {
      let str = list[i].children[1].children[1].innerHTML;

      let j = 0;
      for (let k = 0; k < str2.length; k++) {
    
          if (str[k] == str2[k]) {
          j++;
     
      }
    }
  if(j===str2.length){
      if(list[i].style.display="none"){
           list[i].style.display="flex";
      }
    }


}
   }
   else if(str2===""){
  
    for (let i = 0; i < list.length; i++) {
      list[i].style.display="flex";
    }
    

}

}

else{
  for (let i = 0; i < list.length; i++) {
    let str = list[i].children[1].children[1].innerHTML;
    
    let j = 0;
      for (let k = 0; k < str2.length; k++) {
        
        if (str[k] == str2[k]) {
            j++;
         
        }
      }
      if(j!=str2.length){
      
      list[i].style.display="none";
      }
    

  }
}

  



})

document.querySelector(".drop").addEventListener("click",function(){
  
  let drop=document.querySelector(".change-buttons");
  
  if( drop.style.left=="-100%"){
  
    drop.style.left="0%";
  
  }
  else{
    drop.style.left="-100%";
 
  }


})


