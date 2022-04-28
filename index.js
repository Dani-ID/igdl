const axios = require("axios");
const userInstagram = require("user-instagram");
const { exec } = require("child_process");
const { getPostLink, getRandom, download } = require("./functions.js");
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.clear();

var tod = function () {
console.log(`\n┌──[IGDL BY D4RK]`);
console.log(`├[Type "Exit", To Exit]`);
rl.question(`├[Post/Profile Link] ❱❱ `, (lin) => {

  if (!lin.toLowerCase().startsWith("https://") || !lin.toLowerCase().includes("instagram.com/")) {
     rl.question(`│\n├──[ERROR]\n├[MSG] ❱❱ This Is Not A Post Link\n└[Type "Y" To Restart] ❱❱ `, (answer) => {
        if (answer.toLowerCase() == "y") {
           console.clear();
           tod();
        } else {
           console.log(`\nBye dude >_<`)
	   process.exit();
	}
     })
   } else {
  if (!lin.toLowerCase().includes('/p/') && !lin.toLowerCase().includes('/reel/') && !lin.toLowerCase().includes('tv')) {
     let username = lin.split("https://instagram.com/")[1].split("?")[0]
     userInstagram(username).then(sult => {
        o = `result${getRandom(".jpg")}`
     download(sult.profilePicHD, o, function(){
     exec(`mv ${o} /storage/emulated/0/0igdl`, (err) => {
     rl.question(`│\n├──[RESULT]\n├[Username] ❱❱ ${sult.username}\n├[Following] ❱❱ ${sult.subscribtions}\n├[Followers] ❱❱ ${sult.subscribersCount}\n├[Bio] ❱❱ ${sult.biography}\n├[File Loc] ❱❱ storage/emulated/0igdl/${o}\n└[Type "Y" To Restart] ❱❱ `, (answer1) => {
       if (answer1.toLowerCase() == "y") {
         console.clear();
         tod();
       } else {
         console.log(`\nBye dude >_<`)
         process.exit();
       }
     })
     })
     })
     })
  } else {
  if (lin.toLowerCase() == "exit") {
     console.log(`\nBye dude >_<`)
     process.exit();
  }


  // File Folder
  try {
    exec(`mkdir /storage/emulated/0/0igdl`, (err) => {
    })
  } catch {
  }


	 try {
  let link = lin.split("?")[0]
  getPostLink(link).then(res => {
     if (res.link.includes(".jpg")) {
        o = `result${getRandom(".jpg")}`
      } else {
        o = `result${getRandom(".mp4")}`
      }
     download(res.link, o, function(){
     exec(`mv ${o} /storage/emulated/0/0igdl`, (err) => {
     axios.get(`https://tinyurl.com/api-create.php?url=` + res.link).then(outp => {
     rl.question(`│\n├──[RESULT]\n├[Link] ❱❱ ${outp.data}\n├[File Loc] ❱❱ storage/emulated/0igdl/${o}\n└[Type "Y" To Restart] ❱❱ `, (answer2) => {
       if (answer2.toLowerCase() == "y") {
         console.clear();
         tod();
       } else {
         console.log(`\nBye dude >_<`)
         process.exit();
       }

     })
     })
     })
     })
     })
	  } catch {

     rl.question(`│\n├──[ERROR]\n├[MSG] ❱❱ This Is Not A Post Link\n└[Type "Y" To Restart] ❱❱ `, (answer3) => {
        if (answer3.toLowerCase() == "y") {
           console.clear();
           tod();
        } else {
           console.log(`\nBye dude >_<`)
	   process.exit();
	}
     })
  }
  }
  }
  })
  }

  tod();


  // I made this just for my personal use.
  // ©Dani-ID
