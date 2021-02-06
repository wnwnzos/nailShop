$(function () { // jQB //////////////////////////////
    console.log("로딩완료!");



    // 위젯 아이콘 /////////////////////////////
    $(".ResWidget_icon").click(function () {
        $(".ResWidget_wrap").show();
    });

    // 닫기 클릭시 위젯 닫기
    $(".ResWidget_cbtn").click(function () {
        $(".ResWidget_wrap").hide();
    });



    // 위젯 탑 탭메뉴 ///////////////////////////    
    $(".toptit_tabs a").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });

    // 오늘 클릭시
    $(".todayBtn").click(function () {
        $(".today_tabs_wrap").show();
        $(".date_tabs_wrap").removeClass("show");
        $(".ResWidget_bottom").removeClass("active");
    });

    // 날짜별 클릭시
    $(".dateBtn").click(function () {
        $(".date_tabs_wrap").addClass("show");
        $(".today_tabs_wrap").hide();
        $(".ResWidget_bottom").addClass("active");

    });


    // 오늘 안에있는 탭메뉴들 클릭시 /////////////////////////
    $(".today_tabs_wrap ul li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });









    // 날짜별 스와이퍼 플러그인 적용 ///////////////////
    new Swiper('.swiper-container2', {
        slidesPerView: 5,
        spaceBetween: 5,
        speed: 600, // 넘기는속도
        pagination: { // 페이징

            el: '.swiper-pagination',

            clickable: true, // 페이징을 클릭하면 해당 영역으로 이동, 필요시 지정해 줘야 기능 작동

        },

        navigation: { // 네비게이션

            nextEl: '.swiper-button-next', // 다음 버튼 클래스명

            prevEl: '.swiper-button-prev', // 이번 버튼 클래스명

        },


    }); /*swiper플러그인*/









    /*모달창 슬라이드*******************/
    // 슬라이드 이미지 이동 대상: (.modalSlide)
    var tg = $(".modalSlide");

    /*///////////////////////////////////////
        함수명: goSlide
        기능 : 슬라이드 방향별 이동 
    */ ///////////////////////////////////////

    // 광클금지 변수
    var sprot = 0; //0-허용,1-금지
    // 슬라이드 순번 변수
    var sno = 0;
    //슬라이드 개수 변수
    var scnt = tg.find("li").length;
    console.log("슬개수:" + scnt);
    //////////////////////////////////////////
    var goSlide = function (dir) {

        console.log("광클금지상태:" + sprot);

        /// 광클 금지 설정 ///////////////////
        if (sprot === 1) return false;
        sprot = 1; // 잠금
        setTimeout(function () {
            sprot = 0; //0.8초 후 해제!(CSS 트랜지션 시간과 맞추기)
        }, 800); ///// 타임아웃 ///////////
        ////////////////////////////////////


        //dir-방향(0-왼쪽, 1-오른쪽)
        //console.log("이동방향:" + dir);

        // 오른쪽 전달값이 1이므로 true
        if (dir) {
            $(".modalSlide").stop().animate({
                left: "-100%"
            }, 800, function () {
                $(this).append($(">li", this).first())
                    .css({
                        left: "0"
                    });
            });
            //슬라이드 순번증가
            sno++;
            if (sno === scnt) sno = 0; //한계수(처음으로)

        } // if ///////////////////

        // 왼쪽 전달값이 0이므로 false (else로 처리!)
        else {
            $(".modalSlide").prepend($(".modalSlide>li").last()).css({
                left: "-100%"
            });
            $(".modalSlide").delay(100).animate({
                left: "0"
            }, 800);

            // 슬라이드 개수 감소
            sno--;
            if (sno === -1) sno = scnt - 1; // 한계수(마지막 번호로)

        } // else //////////////////




    }; //////////////// goSlide함수 /////////////////////
    ////////////////////////////////////////////////////


    /* ///////////////////////////////////////////
        함수명: autoCall
        기능: 자동호출 기능
    */ ///////////////////////////////////////////
    var autoI; //인터발용 변수
    var autoCall = function () {
        // console.log("자동넘김!");

        // 4초간격으로 슬라이드함수 호출
        autoI = setInterval(function () {
            goSlide(1);
            chgbtn(1);
        }, 4000); /////// 인터발함수 /////////        

    }; //////////////// autoCall 함수 /////////////////////
    //////////////////////////////////////////////////////

    /* ///////////////////////////////////////////
        함수명: clearAuto
        기능: 자동넘김 지우기
    */ ///////////////////////////////////////////
    var autoT; //타임아웃용 변수
    var clearAuto = function () {
        //console.log("자동지워!");

        // 인터발 지우기
        clearInterval(autoI);
        // 타임아웃지우기(실행쓰나미 방지)
        clearTimeout(autoT);

        //재실행 호출 세팅(3초 후 한번실행 세팅)
        autoT = setTimeout(autoCall, 3000);

    }; //////////////// clearAuto 함수 /////////////////////
    /////////////////////////////////////////////////////





    /// 오른쪽버튼 클릭시 갤러리박스 맨앞 이미지 맨뒤로 이동!
    $(".right_btn").click(function () {
        //console.log("오른쪽!");

        // 자동지우기 함수 호출
        clearAuto();

        //슬라이드 이동함수 호출!
        goSlide(1); // 오른쪽 전달값은 1
        chgbtn(1);
    }); /////// click ///////////


    /// 왼쪽버튼 클릭시 갤러리박스 맨뒤 이미지 맨앞로 이동!
    $(".left_btn").click(function () {
        //console.log("왼쪽!");

        // 자동지우기 함수 호출
        clearAuto();

        //슬라이드 이동함수 호출!
        goSlide(0); // 왼쪽 전달값은 0
        chgbtn(0);
    }); /////// click ///////////


    /// 블릿 클릭시 /////////////////
    $(".slide_btn li").click(function () {
        var idx = $(this).index();
        goSlide(idx, 2);
        // 뒤 전달값은 0,1이 아닌값으로 보낸다!

        // 자동넘김 지우기
        clearAuto();
        chgbtn();

    }); ////////// click ///////////////


    /*///////////////////////////////////
        함수명: chgbtn
        기능: 블릿 현재페이지에 맞게 변경하기
    ///////////////////////////////////////////////*/
    function chgbtn() {

        /// 블릿변경하기 - class="on" 주기
        $(".slide_btn li").eq(sno).addClass("on")
            .siblings().removeClass("on");

    } ////////////////////////////////////// chgMenu 함수 /////////////////





    // 앨범 네일사진 클릭시 모달창 띄우기 ////////////////////////////
    $(".album_wrap > ul > li").click(function (e) {
        e.preventDefault();
       

        $(".album_modal").addClass("show");
    });



    // 앨범 네일사진 모달창 닫기버튼 클릭시 모달창 닫기 /////
    $(".modal_cbtn").click(function (e) {
        e.preventDefault();
        $(".album_modal").removeClass("show");

        // 자동넘김 지우기
        clearAuto();
    });



    // 이달의 아트 스와이퍼 플러그인 적용 ///////////////////
    new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        speed: 600, // 넘기는속도
        pagination: { // 페이징

            el: '.swiper-pagination',

            clickable: true, // 페이징을 클릭하면 해당 영역으로 이동, 필요시 지정해 줘야 기능 작동

        },

        navigation: { // 네비게이션

            nextEl: '.swiper-button-next', // 다음 버튼 클래스명

            prevEl: '.swiper-button-prev', // 이번 버튼 클래스명

        },


    }); /*swiper플러그인*/


    // 우리샵 앨범 탭기능 전환 //////////////////////
    $(".tab_wrap > div").click(function () {
        $(this).addClass("active").siblings().removeClass("active");

    });


    $(".thisMonth_wrap").hide();
    // 앨범 클릭시 앨범사진들 나오기
    $(".albumSection").click(function () {
        $(".album_wrap").show();
        $(".thisMonth_wrap").hide();
    });

    // 이달의 아트 클릭시 앨범사진들 나오기
    $(".thisMonthSection").click(function () {

        $(".album_wrap").hide();
        $(".thisMonth_wrap").show();
    });




    // 새로운 아트등록 모달창 ///////////////////////////////////
    $(".toggleBtn .hide").hide();

    $(".toggleBtn .show").click(function () {
        $(this).hide();
        $(".toggleBtn .hide").show();
        $(".newArtBottom").addClass("hide");
    });

    $(".toggleBtn .hide").click(function () {
        $(this).hide();
        $(".toggleBtn .show").show();
        $(".newArtBottom").removeClass("hide");

    });



    // 아트등록 폼 ///////////////////////////////


    // input 클릭시 밑줄 
    $(".memClick").click(function () {
        $(this).css({
            borderColor: "#333"
        }).parent().siblings().find(".memClick").css({
            borderColor: "#e0e0e0"
        });
    });


    // 가격에 숫자만 입력하게하기 //
    $("input:text[id='price'],input:text[id='memPrice']").on("keyup", function () {
        $(this).val(addComma($(this).val().replace(/[^0-9]/g, "")));

    });

    //천단위마다 콤마 생성
    function addComma(data) {
        return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //모든 콤마 제거 방법
    function removeCommas(data) {
        if (!data || data.length == 0) {
            return "";
        } else {
            return x.split(",").join("");
        }
    }









    // 새로운 아트 네일아트앱에 등록 토글 버튼 ////////////////////
    $("input:checkbox").on('click', function () {
        if ($(this).prop('checked')) {
            $(".newArtShow").show();
        } else {
            $(".newArtShow").hide();
        }
    });


    // 새로운아트 등록 모달창 띄우기 ///////////////////////////////////////////

    $("#newArt").click(function () {
       
        $(".newArt_modal").addClass("show");
    });

    // 닫기버튼 클릭시 모달창 닫기
    $(".newArt_modalCbtn, .cbtn").click(function () {
        $(".newArt_modal").removeClass("show");
    });




}); // jQB ///////////////////////////////////////////////////
