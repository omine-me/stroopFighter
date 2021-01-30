const colJa = ['赤','黄','緑','青','黒']

const colEn = ['red','yellow','green','blue','black']

const colHira = ['\u2002あか\u2002','\u2002\u2002き\u2002\u2002','みどり','\u2002あお\u2002','\u2002くろ\u2002']

const quesText = ['よみ','いろ']

let colMojiNum = 0

let colColNum = 0

let quesTextNum = 0

const time = 3000 //30sec

let currentTime = time

let timer

let finalPoint = 0

let eachPoint = 10000

let pointCounter


jQuery(document).ready(function(){

$('#replay').on('click', () => {
	$('#resultContainer').css("display","none");
	$('#startContainer').css("display","block");
})

$('#startButton').on('click', () => {
	currentTime = time
	finalPoint = 0
	eachPoint = 10000
	$('#startContainer').css("display","none");
	$('#gameContainer').css("display","block");
	$('#choices').css("display","none");
	$('#quesColB').text("３");
	wait(1).done(() => {
        $('#quesColB').text("２");
        wait(1).done(() => {
	        $('#quesColB').text("１");
	        wait(1).done(() => {
	        	$('#choices').css("display","flex");
	        	timer = setInterval(() => {
	        		currentTime--;
				    $("#timeBar").css({
				    	'width': (currentTime / time) * 100 + '%'
				    });
				    if (currentTime == 0){
				    	showResult();
					}
				}, 10);
		        makeQues();
		    });
	    });
    });
})

$('.choice').on('click', () => {
	clearInterval(pointCounter);
	if(eachPoint<0) {eachPoint = 0;}

	if(quesTextNum == 0){
		if($(event.currentTarget).text() == colHira[colMojiNum]){
			$('#correct').css("display","block");
			wait(0.2).done(() => {
            	$('#correct').css("display","none");
        	});
        	finalPoint = finalPoint + eachPoint
		}else{
			$('#wrong').css("display","block");
			wait(0.2).done(() => {
            	$('#wrong').css("display","none");
        	});
        	finalPoint = finalPoint - eachPoint
		}
	}else{
		if($(event.currentTarget).text() == colHira[colColNum]){
			$('#correct').css("display","block");
			wait(0.2).done(() => {
            	$('#correct').css("display","none");
        	});
        	finalPoint = finalPoint + eachPoint
		}else{
			$('#wrong').css("display","block");
			wait(0.2).done(() => {
            	$('#wrong').css("display","none");
        	});
        	finalPoint = finalPoint - eachPoint
		}
	}
	eachPoint = 10000; //back to default
	makeQues();
})



const makeQues = () => {
	quesTextNum = [Math.floor(Math.random() * 2)]
	colMojiNum = [Math.floor(Math.random() * 5)]
	colColNum = [Math.floor(Math.random() * 5)]
	while (colMojiNum[0] === colColNum[0]){
		colColNum = [Math.floor(Math.random() * 5)]
	}
	$('#quesChange').text(quesText[quesTextNum])
	$('#quesColB').text(colJa[colMojiNum])
	$('#quesColB').css("color", colEn[colColNum])
	if(Math.random() < 0.5){
		if(quesTextNum == 0){
			$('#choice1').text(colHira[colMojiNum]) //correctAns
			$('#choice2').text(colHira[colColNum])
		}else{
			$('#choice1').text(colHira[colColNum])
			$('#choice2').text(colHira[colMojiNum])
		}
	}else{
		if(quesTextNum == 0){
			$('#choice2').text(colHira[colMojiNum])
			$('#choice1').text(colHira[colColNum])
		}else{
			$('#choice2').text(colHira[colColNum])
			$('#choice1').text(colHira[colMojiNum])
		}
	}
	pointCounter = setInterval(() => {
		        		eachPoint--;
					}, 1);
}

const showResult = () => {
	clearInterval(timer);
	$('#gameContainer').css("display","none");
	$('#resultContainer').css("display","block");
	$('#finalPoint').text(finalPoint);
	$('#twiLink').attr("href", "http://twitter.com/share?url=https://mineg5071.github.io/stroopFighter&text=🔥ストループ・ファイター🔥%20結果：" + finalPoint + "点&hashtags=ストループ効果")
}

const wait = (sec) => {
 
        // jQueryのDeferredを作成します。
        var objDef = new $.Deferred;
 
        setTimeout(function () {
 
            // sec秒後に、resolve()を実行して、Promiseを完了します。
            objDef.resolve(sec);
 
        }, sec*1000);
 
        return objDef.promise();
 
    };


});