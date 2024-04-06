const adviceNumber = document.querySelector(".advice_number");
const adviceContainer = document.querySelector(".advice");
const btn = document.querySelector(".btn");


function displayAdvice(data) {
  let adviceId = data.id;
  let adviceText = data.advice;
  adviceNumber.textContent = `Advice #${adviceId}`;
  adviceContainer.textContent = `"${adviceText}"`;

  /*  Advice is cached for 2 seconds.
  Any repeat-request within 2 seconds will return the same piece of advice. */
  setTimeout(() => { 
    btn.disabled = false;
  }, 2000);
}

function loading(show) {
  if (show) {
    adviceContainer.textContent = "Loading ..."
    adviceNumber.textContent = "";
  }
}

async function getAdvice() {
  loading(true);
  try {
    btn.disabled = true;
    const response = await fetch(
      `https://api.adviceslip.com/advice`, {mode: "cors"},
    );
    const data = await response.json();
    displayAdvice(data.slip);
  } catch(err) {
    alert("something went wrong :(");
    console.log(err);
    btn.disabled = false;
    return;
  }
  loading(false);
}

btn.addEventListener("click", getAdvice);
getAdvice();
