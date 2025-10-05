const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

  const dropdown= document.querySelectorAll(".dropdown select")
  const btn= document.querySelector("button")
  const fromcurr= document.querySelector(".from select")
  const tocurr=document.querySelector(".to select")
  const msg= document.querySelector(".msg")

  for(let select of dropdown){
    for(let currCode in countryList){
      let newoption = document.createElement("option");
      newoption.innerText=currCode;
      newoption.value=currCode;
      if(select.name ==="from"&& currCode==="USD"){
        newoption.selected="selected"
      } if(select.name ==="to" && currCode ==="INR"){
        newoption.selected="selected"
      }
      select.append(newoption)

    }
    select.addEventListener("change",(evt)=>{
      updateFlag(evt.target);
    })
   
  }
  const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img= element.parentElement.querySelector("img")
    img.src=newsrc

  }
 btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }

  const url = `${BASE_URL}${fromcurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  const data = await response.json();
  const rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

  let finalamt = amtval * rate;
  msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt.toFixed(2)} ${tocurr.value}`;
});




