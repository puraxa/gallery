let token;

function login () {
  let http = new XMLHttpRequest;
  let obj = {};
  obj.email = document.getElementById('email').value;
  obj.password = document.getElementById('password').value;
  let data = JSON.stringify(obj);
  console.log(data);
  http.onreadystatechange = function () {
    console.log(http.readyState);
    console.log(http.status);
    if(http.readyState==4 && http.status==200){
      document.getElementById('hide').style = 'display:none;';
      console.log(http.responseText);
      token = JSON.parse(http.responseText);
      console.log(token.token);
      getImg();
    }
    if(http.readyState == 4 && http.status != 200){
      document.getElementById('error').style = 'display:block';
      document.getElementById('error').innerHTML = `Pogresan email ili password, pokusajte ponovo!`;
    }
  }
  http.open("POST", 'https://3d1pftib26.execute-api.eu-west-1.amazonaws.com/dev/user/login', true);
  http.setRequestHeader('Content-type','application/json');
  http.send(data);
}

function getImg () {
  let information;
  let http = new XMLHttpRequest;
  let url = "https://3d1pftib26.execute-api.eu-west-1.amazonaws.com/dev/images/list";
  http.open('GET' , url,true);
  http.setRequestHeader('Authorization',token.token);
  http.send();
  http.onreadystatechange = function () {
    if(http.readyState==4 && http.status==200){
      information = JSON.parse(http.responseText);
      console.log(information);
      for(let i = 0; i < information.Contents.length; i++){
        let url = information.base_url + '/' + information.Contents[i].Key;
        let text = information.Contents[i].Key.split('-');
        console.log(text);
        let transText = upper(text);
        console.log(transText);
        document.getElementById('gallery').innerHTML += `<div class="card col-4 bg-secondary">
        <img class="card-img-top" src="${url}" alt="Card image cap" width="200px" height="200px">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
        </div>
      </div>`;
      }
    }
  }
}

function upper(arr){
  for(let i = 0; i < arr.length - 2 ; i++){
    arr[i] = arr[i].charAt(0) + arr[i].slice(1);
  }
  return arr;
}