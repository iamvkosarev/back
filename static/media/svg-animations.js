let isFocusedOnce = false;
let isScrolled = false;
let svgElement;
let svgObejct;
let cosm;
let tele;
let creat;
let urban;
let energy;
let bio;
let eco;
let human;

let currentWorking = false;

let fillRandomElements = {
    0: partColor_energy,
    1: partColor_eco,
    2: partColor_cosm,
    3: partColor_tele,
    4: partColor_creat,
    5: partColor_human,
    6: partColor_bio,
    7: partColor_urban,
};

let resetRandomElements = {
    0: resetPartColor_energy,
    1: resetPartColor_eco,
    2: resetPartColor_cosm,
    3: resetPartColor_tele,
    4: resetPartColor_creat,
    5: resetPartColor_human,
    6: resetPartColor_bio,
    7: resetPartColor_urban,
};


let lib = {

    'tele_fill': bindColor_tele,
    'tele_reset': resetColor_tele,

    'energy_fill': bindColor_energy,
    'energy_reset': resetColor_energy,

    'creat_fill': bindColor_creat,
    'creat_reset': resetColor_creat,

    'cosm_fill': bindColor_cosm,
    'cosm_reset': resetColor_cosm,

    'urban_fill': bindColor_urban,
    'urban_reset': resetColor_urban,

    'human_fill': bindColor_human,
    'human_reset': resetColor_human,

    'eco_fill': bindColor_eco,
    'eco_reset': resetColor_eco,

    'bio_fill': bindColor_bio,
    'bio_reset': resetColor_bio,
};

// анимация
let animCosm = [];
let animTele = [];
let animCreat = [];
let animUrban = [];
let animEnergy = [];
let animBio = [];
let animEco = [];
let animHuman = [];


// Различные части анимации
let birds = [];
let eco_lopasti = [];
let human_graph = [];
let cosm_rocket;
let bio_colba;
let tele_text = [];
let cosm_items = [];

let test = [];

let mousePosition = 0;
let currentMousePos = { x: -1, y: -1 };

let currentSvgElement;

let arrayOfElements;

$(document).ready(function () {

    $(window).load(function () {

        svgElement = $('#svgParent');
        console.log('Svg готов к работе');
        svgObejct = $('#svg').first().contents();

        // Назовем каждый элемент сразу
        cosm = svgObejct.find('#cosm')[0];
        tele = svgObejct.find('#tele')[0];
        creat = svgObejct.find('#creat')[0];
        urban = svgObejct.find('#urban')[0];
        energy = svgObejct.find('#energy')[0];
        bio = svgObejct.find('#bio')[0];
        eco = svgObejct.find('#eco')[0];
        human = svgObejct.find('#human')[0];
        arrayOfElements = svgObejct.find('.svg_anim');
        $(energy).find('.test').each(function () {
            birds.push($(this)[0]);
        });
        $(eco).find('.eco_lopast').each(function () {
            eco_lopasti.push($(this)[0]);
        });
        eco_lopasti.push($(eco).find('#eco_lopast_tube')[0]);
        svgObejct.find('.human_graph').each(function () {
            human_graph.push($(this)[0]);
        });
        $(cosm).find('.cosm_star').each(function () {
            animCosm.push($(this)[0]);
        });

        $(tele).find('#tele_text').children().each(function () {
            $(this)[0].setAttribute('opacity', 0);
            tele_text.push($(this)[0]);
        });
        bio_colba = $(bio).find('#bio_colba')[0];
        cosm_rocket = $(cosm).find('#cosm_rocket')[0];

        $(cosm).find('.cosm_yellow_items').each(function () {
            cosm_items.push($(this)[0]);
        });


        initAnimations();

        $(document).mousemove(function(event) {
            currentMousePos.x = event.pageX;
            currentMousePos.y = event.pageY;
        });

        // использование:
        // printNumbers(0, currentMousePos);
        // var counter = 0;
        // intervalMouseOver = setInterval(function () {
        //     ++counter;
        // }, 1000);



        // clearInterval(myInterval);


        $(arrayOfElements).hover(function (e) {
            if (currentSvgElement == undefined) {
                lib[$(this)[0].getAttribute('id') + '_fill']();
                currentSvgElement = $(this)[0];
            } else {
                checkCurrentElement($(this)[0], currentSvgElement);
                currentSvgElement = $(this)[0];
            }
        });

        //TODO - убрать чисто тест
        // $(document).on('click', function () {
        //     test();
        //     // runAnimation(2);
        // });

        // Бесконечная функция мигания объектов на картинке
        // (function loop() {
        //     // // Случайная задержка
        //     // var rand = Math.round(Math.random() * (5000 - 500)) + 1000;
        //     // // Случайный номер элемента который разукрасится
        //     // var randNumber = Math.round(Math.random() * 7);
        //     setTimeout(function () {
        //         printNumbers()
        //         console.log('start');
        //         runAnimation(randNumber);
        //         loop();
        //     }, rand);
        // }());
        // runAnimation()
        setTimeout(function () {
            partColor_energy();
            partColor_bio();
            partColor_cosm();
            partColor_creat();
            partColor_eco();
            partColor_human();
            partColor_tele();
            partColor_urban();
        }, 2000);

        // При клике на картинку покажем попап с текстом
        $(arrayOfElements).on('click', function () {
            $('.way_desc.active').removeClass('active');
            $('#way_' + $(this)[0].getAttribute('id')).addClass('active');
            $('#hernya').modal('show');
        });


        // При клике на картинку - разобьем всю эту фигню
        // Так как все картинки в разные места - делаем всю херь индивидуально
        $(svgObejct).hover(function () {
            // Если уже наводились мышью, то не сработает
            if (isFocusedOnce == false) {

                anime({
                    targets: energy,
                    scale: 0.8,
                    duration: 3000
                });
                resetColor_energy();

                anime({
                    targets: tele,
                    translateX: 100,
                    scale: 0.8,
                    duration: 3000
                });
                resetColor_tele();

                anime({
                    targets: creat,
                    translateX: 180,
                    scale: 0.8,
                    duration: 3000
                });
                resetColor_creat();

                anime({
                    targets: cosm,
                    translateX: 300,
                    scale: 0.8,
                    duration: 3000
                });
                resetColor_cosm();

                anime({
                    targets: urban,
                    translateY: 180,
                    scale: 0.8,
                    duration: 3000
                });
                resetColor_urban();

                anime({
                    targets: human,
                    translateX: 100,
                    translateY: 180,
                    scale: 0.8,
                    duration: 3000
                });
                resetColor_human();

                anime({
                    targets: eco,
                    translateX: 180,
                    translateY: 180,
                    scale: 0.8,
                    duration: 3000
                });
                resetColor_eco();

                anime({
                    targets: bio,
                    translateX: 300,
                    translateY: 180,
                    scale: 0.8,
                    duration: 3000
                });
                resetColor_bio();

                // showWayDescriptions();

                isFocusedOnce = true;
                isScrolled = false;
            }


            $(window).scroll(function () {
                if (svgElement != 'undefined') {
                    if (isScrolledIntoView(svgElement) && isScrolled == false) {
                        isScrolled = true;
                        combineElementsBack();
                        hideWayDescriptions();
                    }
                    // console.log(svgElement);
                    // if(isScrolledIntoViewElement($('#svgParent')[0]) && currentWorking === false){
                    // console.log(Math.floor(Math.random() * 5));
                    // currentWorking = true;
                    // console.log(13);
                    // bindColorEnergyLamp();
                    // setTimeout(function () {
                    // 	resetColorEnergyLamp();
                    // }, 3000);

                    // }

                }

            });

        });


    });
});

function checkCurrentElement(currentElement, previousElement) {
    var current = currentElement.getAttribute('id');
    var previous = previousElement.getAttribute('id');
    if (current == previous) {
        return false;
    } else {
        lib[current + '_fill']();
        lib[previous + '_reset']();
    }
}

function runAnimation(number) {
    fillRandomElements[number + '']();
    resetRandomElements[number + '']();
}


function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    var elemHalf = (elemBottom - elemTop) / 2;
    if (docViewTop > elemTop + elemHalf) {
        return true;
    } else {
        return false;
    }
}

function isScrolledIntoViewElement(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top - 200;
    var elemBottom = elemTop + $(elem).height() + 200;

    return ((elemBottom >= docViewBottom) && (elemTop <= docViewTop));
}


// Функция собирания картинки воедино
function combineElementsBack() {
    // Так как тут все одинаково и нужно вернуть в 0 - можем запихнуть в один вызов
    anime({
        targets: [energy, tele, creat, cosm, urban, human, eco, bio],
        translateX: 0,
        translateY: 0,
        scale: 1,
        duration: 3000
    });
    // Разукрасим все
    bindColor_energy();
    bindColor_tele();
    bindColor_creat();
    bindColor_cosm();
    bindColor_urban();
    bindColor_human();
    bindColor_eco();
    bindColor_bio();
    // showWayDescriptions();
    isFocusedOnce = false;
}


// Отображение/Скрытие надписей под картинками
function hideWayDescriptions() {
    $(svgObejct).find('.way_description').each(function () {
        $(this).hide();
    });
}


// Разрисовка
function bindColor_energy() {
    $(energy).find('.way_description').fadeIn(500);
    $(energy).find('.lamp_yellow').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#FFA75F'});
    });
    SVG.adopt($(energy).find('#energy_tube')[0]).animate(500).attr({fill: '#1D3EFF'});
    SVG.adopt($(energy).find('#energy_tube_inner')[0]).animate(500).attr({fill: '#1D3EFF'});
    $(energy).find('.energy_steam').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#DDDDDD'});
    });
    SVG.adopt($(energy).find('#red_fab_0')[0]).animate(500).attr({fill: '#ED1F21'});
    SVG.adopt($(energy).find('#red_fab_1')[0]).animate(500).attr({fill: '#ED1F21'});
    SVG.adopt($(energy).find('#red_fab_2')[0]).animate(500).attr({fill: '#ED1F21'});
    SVG.adopt($(energy).find('#energy_green_house')[0]).animate(500).attr({fill: '#00725C'});
    SVG.adopt($(energy).find('#energy_gray_house_0')[0]).animate(500).attr({fill: '#ACACAC'});
    SVG.adopt($(energy).find('#energy_gray_house_1')[0]).animate(500).attr({fill: '#ACACAC'});
    $(energy).find('.energy_electro').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#EFE339'});
    });
    $(energy).find('.energy_panel').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#00725C'});
    });
    SVG.adopt($(energy).find('#energy_storm')[0]).animate(500).attr({fill: '#EFE339'});
    $(energy).find('.energy_val').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#DDDDDD'});
    });
}


function resetColor_energy() {
    $(energy).find('.way_description').fadeOut(500);
    $(energy).find('.lamp_yellow').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    SVG.adopt($(energy).find('#energy_tube')[0]).animate(200).attr({fill: '#FFFFFF'});
    SVG.adopt($(energy).find('#energy_tube_inner')[0]).animate(200).attr({fill: '#FFFFFF'});
    $(energy).find('.energy_steam').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    SVG.adopt($(energy).find('#red_fab_0')[0]).animate(200).attr({fill: '#FFFFFF'});
    SVG.adopt($(energy).find('#red_fab_1')[0]).animate(200).attr({fill: '#FFFFFF'});
    SVG.adopt($(energy).find('#red_fab_2')[0]).animate(200).attr({fill: '#FFFFFF'});
    SVG.adopt($(energy).find('#energy_green_house')[0]).animate(200).attr({fill: '#FFFFFF'});
    SVG.adopt($(energy).find('#energy_gray_house_0')[0]).animate(200).attr({fill: '#FFFFFF'});
    SVG.adopt($(energy).find('#energy_gray_house_1')[0]).animate(200).attr({fill: '#FFFFFF'});
    $(energy).find('.energy_electro').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(energy).find('.energy_panel').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    SVG.adopt($(energy).find('#energy_storm')[0]).animate(200).attr({fill: '#FFFFFF'});
    $(energy).find('.energy_val').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
}


function bindColor_tele() {
    $(tele).find('.way_description').fadeIn(500);
    SVG.adopt($(tele).find('#tele_red_block')[0]).animate(500).attr({fill: '#ED1F21'});
    SVG.adopt($(tele).find('#tele_light_green_item')[0]).animate(500).attr({fill: '#36A560'});
    SVG.adopt($(tele).find('#tele_dark_green_item')[0]).animate(500).attr({fill: '#00725C'});
    $(tele).find('.tele_light_orange_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#FFA75F'});
    });
    $(tele).find('.tele_light_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#DDDDDD'});
    });
    $(tele).find('.tele_items_gray').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#ACACAC'});
    });
    $(tele).find('.tele_mon').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#1D3EFF'});
    });
    $(tele).find('.tele_sput').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#EFE339'});
    });
}

function resetColor_tele() {
    $(tele).find('.way_description').fadeOut(500);
    SVG.adopt($(tele).find('#tele_red_block')[0]).animate(200).attr({fill: '#FFFFFF'});
    SVG.adopt($(tele).find('#tele_light_green_item')[0]).animate(200).attr({fill: '#FFFFFF'});
    SVG.adopt($(tele).find('#tele_dark_green_item')[0]).animate(200).attr({fill: '#FFFFFF'});
    $(tele).find('.tele_light_orange_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(tele).find('.tele_light_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(tele).find('.tele_items_gray').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(tele).find('.tele_mon').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(tele).find('.tele_sput').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
}


function bindColor_creat() {
    $(creat).find('.way_description').fadeIn(500);
    SVG.adopt($(creat).find('#creat_dark_gray_item')[0]).animate(500).attr({fill: '#ACACAC'});
    $(creat).find('.creat_blue_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#1D3EFF'});
    });
    $(creat).find('.creat_light_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#DDDDDD'});
    });
    $(creat).find('.creat_red_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#ED1F21'});
    });
    $(creat).find('.creat_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#EFE339'});
    });
    $(creat).find('.creat_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#00725C'});
    });
    $(creat).find('.creat_light_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#FFA75F'});
    });

}


function resetColor_creat() {
    $(creat).find('.way_description').fadeOut(500);
    SVG.adopt($(creat).find('#creat_dark_gray_item')[0]).animate(200).attr({fill: '#FFFFFF'});
    $(creat).find('.creat_blue_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(creat).find('.creat_light_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(creat).find('.creat_red_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(creat).find('.creat_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(creat).find('.creat_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(creat).find('.creat_light_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });

}

function bindColor_cosm() {
    $(cosm).find('.way_description').fadeIn(500);
    SVG.adopt($(cosm).find('#cosm_green_item')[0]).animate(500).attr({fill: '#36A560'});
    $(cosm).find('.cosm_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#EFE339'});
    });
    $(cosm).find('.cosm_red_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#ED1F21'});
    });
    $(cosm).find('.cosm_dark_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#00725C'});
    });
    $(cosm).find('.cosm_blue_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#1D3EFF'});
    });
    $(cosm).find('.cosm_light_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#DDDDDD'});
    });
    $(cosm).find('.cosm_dark_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#ACACAC'});
    });
}


function resetColor_cosm() {
    $(cosm).find('.way_description').fadeOut(500);
    SVG.adopt($(cosm).find('#cosm_green_item')[0]).animate(200).attr({fill: '#FFFFFF'});
    $(cosm).find('.cosm_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(cosm).find('.cosm_red_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(cosm).find('.cosm_dark_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(cosm).find('.cosm_blue_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(cosm).find('.cosm_light_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(cosm).find('.cosm_dark_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
}

function bindColor_urban() {
    $(urban).find('.way_description').fadeIn(500);
    $(urban).find('.urban_dark_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#ACACAC'});
    });
    $(urban).find('.urban_dark_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#00725C'});
    });
    $(urban).find('.urban_red_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#ED1F21'});
    });
    $(urban).find('.urban_light_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#DDDDDD'});
    });
    $(urban).find('.urban_blue_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#1D3EFF'});
    });
    $(urban).find('.urban_light_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#FFA75F'});
    });
    $(urban).find('.urban_light_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#36A560'});
    });

}

function resetColor_urban() {
    $(urban).find('.way_description').fadeOut(500);
    $(urban).find('.urban_dark_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(urban).find('.urban_red_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(urban).find('.urban_light_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(urban).find('.urban_blue_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(urban).find('.urban_dark_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(urban).find('.urban_light_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(urban).find('.urban_light_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
}


function bindColor_human() {
    $(human).find('.way_description').fadeIn(500);
    $(human).find('.human_dark_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#ACACAC'});
    });
    $(human).find('.human_light_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#DDDDDD'});
    });
    $(human).find('.human_dark_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#00725C'});
    });
    $(human).find('.human_blue_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#1D3EFF'});
    });
    $(human).find('.human_light_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#FFA75F'});
    });
    $(human).find('.human_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#EFE339'});
    });
    $(human).find('.human_red_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#ED1F21'});
    });
}

function resetColor_human() {
    $(human).find('.way_description').fadeOut(500);
    $(human).find('.human_dark_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(human).find('.human_light_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(human).find('.human_dark_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(human).find('.human_blue_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(human).find('.human_light_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(human).find('.human_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(human).find('.human_red_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
}

function bindColor_eco() {
    $(eco).find('.way_description').fadeIn(500);
    $(eco).find('.eco_red_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#ED1F21'});
    });
    $(eco).find('.eco_blue_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#1D3EFF'});
    });
    $(eco).find('.eco_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#EFE339'});
    });
    $(eco).find('.eco_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#36A560'});
    });
    $(eco).find('.eco_dark_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#ACACAC'});
    });
    $(eco).find('.eco_light_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#DDDDDD'});
    });
}

function resetColor_eco() {
    $(eco).find('.way_description').fadeOut(500);
    $(eco).find('.eco_dark_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(eco).find('.eco_light_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(eco).find('.eco_red_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(eco).find('.eco_blue_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(eco).find('.eco_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(eco).find('.eco_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
}

function bindColor_bio() {
    $(bio).find('.way_description').fadeIn(500);
    $(bio).find('.bio_red_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#ED1F21'});
    });
    $(bio).find('.bio_light_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#36A560'});
    });
    $(bio).find('.bio_dark_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#00725C'});
    });
    $(bio).find('.bio_blue_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#1D3EFF'});
    });
    $(bio).find('.bio_light_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#FFA75F'});
    });
    $(bio).find('.bio_dark_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#ACACAC'});
    });
    $(bio).find('.bio_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#EFE339'});
    });
    $(bio).find('.bio_light_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(500).attr({fill: '#DDDDDD'});
    });
}

function resetColor_bio() {
    $(bio).find('.way_description').fadeOut(500);
    $(bio).find('.bio_red_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(bio).find('.bio_light_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(bio).find('.bio_blue_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(bio).find('.bio_light_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(bio).find('.bio_dark_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(bio).find('.bio_yellow_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(bio).find('.bio_light_gray_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
    $(bio).find('.bio_dark_green_items').each(function () {
        SVG.adopt($(this)[0]).animate(200).attr({fill: '#FFFFFF'});
    });
}

function partColor_energy() {
    animEnergy[0].play();
}

function resetPartColor_energy() {
    currentWorking = false;
}

function partColor_eco() {
    animEco[0].play();
    animEco[1].play();
    animEco[2].play();
    animEco[3].play();
}

function resetPartColor_eco() {
    currentWorking = false;
}


function partColor_cosm() {
    animCosm[0].play();
    animCosm[1].play();
    animCosm[2].play();
}

function resetPartColor_cosm() {
    currentWorking = false;
}


function partColor_tele() {
    animTele[0].play();
    animTele[1].play();
}

function resetPartColor_tele() {
    currentWorking = false;
}


function partColor_creat() {
    animCreat['blue'].play();
}

function resetPartColor_creat() {
    currentWorking = false;
}


function partColor_human() {
    animHuman[0].play();
    animHuman[1].play();
}

function resetPartColor_human() {
    currentWorking = false;
}


function partColor_bio() {

    animBio[0].play();
    animBio[1].play();
    animBio[2].play();
    animBio[3].play();
}

function resetPartColor_bio() {
    currentWorking = false;
}

function partColor_urban() {
    animUrban[0].play();
    animUrban[1].play();
    animUrban[2].play();

}

function resetPartColor_urban() {
    currentWorking = false;
}


// "ЭДАКИЕ" АНИМАЦИИ

// Птички
function animateBirds(reset = false) {
    if (!reset) {
        birds[0].setAttribute("transform", "rotate(180 447.54998779296875,72.19999694824219)");
        birds[1].setAttribute("transform", "rotate(180 453.54998779296875,41.849998474121094)");
        birds[2].setAttribute("transform", "rotate(-180 466.75,78.60000610351562)");
    }
    else {
        birds[0].setAttribute("transform", "");
        birds[1].setAttribute("transform", "");
        birds[2].setAttribute("transform", "");
    }
}

// Лопасти вышки
function animateFan() {
    anime({
        targets: eco_lopasti[0],
        points: [
            {value: eco_lopasti[2].getAttribute('points')},
            {value: eco_lopasti[1].getAttribute('points')},
            {value: eco_lopasti[0].getAttribute('points')}
        ],
        easing: 'linear',
        duration: 1000,
        direction: 'alternate',
    });

    anime({
        targets: eco_lopasti[1],
        points: [
            {value: eco_lopasti[0].getAttribute('points')},
            {value: eco_lopasti[2].getAttribute('points')},
            {value: eco_lopasti[1].getAttribute('points')}
        ],
        easing: 'linear',
        duration: 1000,
        direction: 'alternate',
    });

    anime({
        targets: eco_lopasti[2],
        points: [
            {value: eco_lopasti[1].getAttribute('points')},
            {value: eco_lopasti[0].getAttribute('points')},
            {value: eco_lopasti[2].getAttribute('points')}
        ],
        easing: 'linear',
        duration: 1000,
        direction: 'alternate',
    });
}


// инициализация всех анимаций на картинках
function initAnimations() {

    var rocket = [];

    $(svgObejct).find('#cosm_rocket').children().each(function () {
       rocket.push($(this)[0]);
    });


    var animHumanDelay = 0;
    animHuman[0] = anime({
        targets: human_graph,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1000,
        loop: true,
        autoplay: false,
        delay: function (el, i, l) {
            animHumanDelay = Math.round(Math.random() * (5000 - 500)) + 1000;
            return animHumanDelay;
        },
        direction: 'alternate'
    });

    var humanGraph = [];
    $(svgObejct).find('#human_graph_gray').children().each(function () {
        humanGraph.push($(this)[0]);
    });

    animHuman[1] = anime({
        targets: humanGraph,
        easing: 'linear',
        fill: '#ACACAC',
        duration: 3200,
        loop: true,
        autoplay: false,
        delay: animHumanDelay,
        direction: 'alternate'
    });


    animEco[0] = anime({
        targets: eco_lopasti[0],
        points: [
            {value: eco_lopasti[2].getAttribute('points')},
            {value: eco_lopasti[1].getAttribute('points')},
            {value: eco_lopasti[0].getAttribute('points')}
        ],
        easing: 'linear',
        duration: 1000,
        direction: 'alternate',
        loop: true,
        autoplay: false,
        endDelay: 1000
    });

    animEco[1] = anime({
        targets: eco_lopasti[1],
        points: [
            {value: eco_lopasti[0].getAttribute('points')},
            {value: eco_lopasti[2].getAttribute('points')},
            {value: eco_lopasti[1].getAttribute('points')}
        ],
        easing: 'linear',
        duration: 1000,
        direction: 'alternate',
        loop: true,
        autoplay: false,
        endDelay: 1000
    });

    animEco[2] = anime({
        targets: eco_lopasti[2],
        points: [
            {value: eco_lopasti[1].getAttribute('points')},
            {value: eco_lopasti[0].getAttribute('points')},
            {value: eco_lopasti[2].getAttribute('points')}
        ],
        easing: 'linear',
        duration: 1000,
        direction: 'alternate',
        loop: true,
        autoplay: false,
        endDelay: 1000
    });

    animEco[3] = anime({
        targets: eco_lopasti,
        easing: 'linear',
        duration: 1000,
        fill: '#DDDDDD',
        direction: 'alternate',
        loop: true,
        autoplay: false,
        endDelay: 500
    });

    animUrban[0] = anime({
        targets: $(urban).find('#urban_crane_block')[0],
        translateY: 80,
        easing: 'linear',
        duration: 1000,
        fill: '#ACACAC',
        direction: 'alternate',
        loop: true,
        autoplay: false,
        delay: 2000,
        endDelay: 1000
    });

    animUrban[1] = anime({
        targets: $(urban).find('#urban_crane_line')[0],
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'linear',
        duration: 1000,
        direction: 'alternate',
        loop: true,
        delay: 2000,
        endDelay: 1000,
        autoplay: false
    });
    var urban_block = [];
    $(svgObejct).find('#urban_crane_block').children().each(function () {
        urban_block.push($(this)[0]);
    });

    animUrban[2] = anime({
        targets: urban_block,
        fill: '#ACACAC',
        easing: 'linear',
        duration: 1000,
        direction: 'alternate',
        loop: true,
        delay: 2000,
        endDelay: 1000,
        autoplay: false
    });




    animCreat['blue'] = anime({
        targets: [$(creat).find('#creat_eye_blue')[0]],
        fill: '#1D3EFF',
        easing: 'linear',
        direction: 'alternate',
        loop: true,
        endDelay: 1000,
        delay: function (el, i, l) {
            return Math.round(Math.random() * (5000 - 500)) + 1000;
        },
        autoplay: false,
    });

    animCosm[0] = anime({
        targets: animCosm,
        scaleX: 1.07,
        scaleY: 1.5,
        fill: '#DDDDDD',
        translateX: -92,
        translateY: -30,
        easing: 'linear',
        duration: 1200,
        direction: 'alternate',
        loop: true,
        delay: function (el, i, l) {
            return Math.round(Math.random() * (5000 - 500)) + 1000;
        },
        endDelay: 1000,
        autoplay: false
    });

    var rocket_timeout = 0;

    animCosm[1] = anime({
        targets: [cosm_rocket],
        scale: 0.95,
        // scaleX: 1.1,
        translateX: 150,
        translateY: -35,
        easing: 'linear',
        duration: 1200,
        direction: 'alternate',
        loop: true,
        delay: function (el, i, l) {
            rocket_timeout =  Math.round(Math.random() * (5000 - 500)) + 1000;
            return rocket_timeout;
        },
        endDelay: 1000,
        autoplay: false
    });

    animCosm[2] = anime({
        targets: rocket,
        fill: '#EFE339',
        easing: 'linear',
        duration: 1800,
        direction: 'alternate',
        loop: true,
        delay: rocket_timeout,
        endDelay: 1000,
        autoplay: false
    });

    animBio[0] = anime({
        targets: [bio_colba],
        keyframes: [
            {translateX: -10, duration: 200},
            {translateX: 20, duration: 200},
            {translateX: -10, duration: 200},
            {translateX: 0, duration: 200},
        ],
        easing: 'linear',
        direction: 'alternate',
        loop: true,
        endDelay: 2000,
        delay: 3000,
        autoplay: false
    });

    animBio[1] = anime({
        targets: [$(bio_colba).find('#bio_colba_smoke')[0]],
        opacity: 1,
        fill: '#DDDDDD',
        duration: 1000,
        easing: 'linear',
        direction: 'alternate',
        loop: true,
        delay: 4700,
        endDelay: 200,
        autoplay: false
    });



    animBio[2] = anime({
        targets: [$(bio_colba).find('#bio_colba_green')[0]],
        fill: '#00725c',
        duration: 1000,
        easing: 'linear',
        direction: 'alternate',
        loop: true,
        delay: 3000,
        endDelay: 2000,
        autoplay: false
    });

    animBio[3] = anime({
        targets: [$(bio_colba).find('#bio_colba_gray')[0]],
        fill: '#acacac',
        duration: 1000,
        easing: 'linear',
        direction: 'alternate',
        loop: true,
        delay: 3000,
        endDelay: 2000,
        autoplay: false
    });

    var loc_tele = [];

    $(svgObejct).find('.tele_sput').each(function () {
       loc_tele.push($(this)[0]);
    });

    animTele[0] = anime({
        targets: tele_text,
        easing: 'easeInOutSine',
        opacity: 1,
        duration: 2000,
        endDelay: 1000,
        loop: true,
        autoplay: false,
        delay: function (el, i, l) {
            return Math.round(Math.random() * (2000 - 500)) + 500;
        },
        direction: 'alternate'
    });

    animTele[1] = anime({
        targets: loc_tele,
        easing: 'easeInOutSine',
        fill: '#efe339',
        duration: 2000,
        endDelay: 1000,
        loop: true,
        autoplay: false,
        delay: function (el, i, l) {
            return Math.round(Math.random() * (5000 - 500)) + 1000;
        },
        direction: 'alternate'
    });


    animEnergy[0] = anime({
        targets: [$(energy).find('#energy_storm')[0]],
        easing: 'easeInOutSine',
        keyframes: [
            {fill: '#efe339', duration: 200},
            {fill: '#f2fff3', duration: 300},
            {fill: '#efe339', duration: 200},
            {fill: '#f2fff3', duration: 300},
            {fill: '#efe339', duration: 400},
            {fill: '#f2fff3', duration: 500},
            {fill: '#efe339', duration: 2000},
        ],
        endDelay: 1000,
        delay: 1000,
        loop: true,
        autoplay: false,
        direction: 'alternate'
    });
}


// function printNumbers(time, position) {
//     let currentTime = time;
//     let mousePosition = position;
//
//
//     let timerId = setInterval(function() {
//         console.log(currentTime);
//         console.log(currentMousePos);
//         if (currentTime > 5 && (mousePosition.y === currentMousePos.y && mousePosition.x === currentMousePos.x)) {
//             isScrolled = true;
//             combineElementsBack();
//             hideWayDescriptions();
//             clearInterval(timerId);
//         }
//         currentTime++;
//     }, 1000);
// }

