const weatherForm = document.querySelector("form");
const search = document.querySelector("form input");
const messageSucess = document.querySelector("#message-success");
const messageError = document.querySelector("#message-error");

const fetchData = (address) => {
  return fetch(
    "/weather?address=" + encodeURIComponent(address)
  ).then((data) => {
    return data.json();
  });
};

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = search.value;
  messageSucess.innerHTML = 'Loadding.....';
  messageError.innerHTML = '';
  const data = await fetchData(location);
  if(data.errorMessage){
    messageError.innerHTML = data.errorMessage;   
  }else if(data.err){
      messageError.innerHTML = data.err;
  }else{
      messageSucess.innerHTML = data.forecast;
      messageError.innerHTML = data.location;
  }
});
