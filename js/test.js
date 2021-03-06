Kakao.init('d6301868b77a02fa536be14be31c7862'); // 초기화

var sendMessageK = ""

function sendLink() { // 카카오톡 공유하기
Kakao.Link.sendDefault({
	objectType: 'text',
	text: sendMessageK,
	link: {
	        mobileWebUrl: 'https://developers.kakao.com',
	        webUrl: 'https://developers.kakao.com',
	      },
	    })
	  }
function shareStoryWeb() { // 카카오 스토리 공유하기
	Kakao.Story.share({
	url: 'https://developers.kakao.com',
	text: sendMessageK,
	    })
	  }
       
var test = new Vue({
    el: '#test',
    data: {
        intro: '전략기획팀\n\n정서테스트',
        title: '샘플 테스트',
        currentIndex: 0,
        qna: [],
        result: ''
    },
    beforeMount: function() {
        this.insertQna('당신은 누구십니까?', ['이정X', '박진X', '조세X', '최수X', '송X', '김영X', '윤유X'], null);
        this.insertQna('Q1. 숲 속을 걷고 있는 당신 앞에 불쑥 나타난 동물! 어떤 동물일까?', null, 'text');
        this.insertQna('Q2. 당신의 눈 앞에 보이는 벌레는 몇 마리일까?', [1,2,3,4,5], null);
    },
    mounted: function() {
        $('#intro').show();
        $('#main').hide();
        $('#result').hide();
    },
    methods: {
        insertQna: function(q, a, t) {
            var item = {
                q: q,
                a: a,
                r: '',
                t: t
            };
            this.qna.push(item);
        },
        start: function() {
            $('#intro').hide();
            $('#main').show();
            $('#result').hide();

            var self = this;
            setTimeout(function() {
                if(typeof self.qna[0].t != 'undefined' && self.qna[0].t != null) {
                    $('#q0a0').attr('type', self.qna[0].t);
                    $('#q0a0').focus();
                }
            }, 200);
        },
        next: function () {
            var self = this;
            if(this.currentIndex < this.qna.length-1) {
                this.currentIndex++;
                if(typeof this.qna[this.currentIndex].t != 'undefined' && this.qna[this.currentIndex].t != null) {
                    setTimeout(function() {
                        $('#q'+self.currentIndex+'a0').attr('type', self.qna[self.currentIndex].t);
                        $('#q'+self.currentIndex+'a0').focus();
                    }, 200);                    
                }
            } else {
                var check = true;
                for(var i=0; i < this.qna.length; i++) {
                    if(this.qna[i].r === '') {
                        check = false;
                    }
                }
                if(check) {
                    this.showResult();
                } else {
                    alert("아직 완료되지 않았습니다.");
                }
            }
        },
        prev: function () {
            var self = this;
            if(this.currentIndex > 0) {
                this.currentIndex--;
                if(typeof this.qna[this.currentIndex].t != 'undefined' && this.qna[this.currentIndex].t != null) {
                    setTimeout(function() {
                        $('#q'+self.currentIndex+'a0').attr('type', self.qna[self.currentIndex].t);
                        $('#q'+self.currentIndex+'a0').focus();
                    }, 200);                    
                }
            } else {
                alert('첫 질문입니다.');
            }
        },
        showResult: function() {
	this.result =  '당신은 '+this.qna[0].r+'입니다.\n\n';
            this.result +=  'Q1. 불쑥 나타난 동물 = '+this.qna[1].r+'\n=> 사람들이 나를 보는 모습\n\n';
            this.result += 'Q2. 눈 앞의 벌레 수 = '+this.qna[2].r+'마리\n=> 나를 화나게 하는 사람 수\n\n';
	    sendMessageK = this.result;
            $('#main').hide();
            $('#result').show();
        }
    }
});
