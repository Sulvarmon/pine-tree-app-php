$(document).ready(function() {

    //variables
    var headerImages = ["url('./images/bg_img_1.jpg')", "url('./images/bg_img_2.jpg')", "url('./images/bg_img_3.jpg')", "url('./images/bg_img_4.jpg')", ];
    var pages = ["home_main", "products_main", "partners_main", "clients_main", "news_main", "about_main", "contacts_main"];
    var headerCrsCurrentItem = 1;
    var menuArray = [];
    var partnersArray = [];
    var productsArray = [];
    var newsArray = [];
    var clientsArray = [];
    var timeout = 500;
    var partnersWidth = parseInt($(".partners_carousel_cont_item").css("width"));
    var partnerCrslContWidth = parseInt($(".partners_carousel_cont").css("width"));
    var parentsItemsGap = [partnerCrslContWidth % partnersWidth] / [(partnerCrslContWidth - partnerCrslContWidth % partnersWidth) / partnersWidth]
    var prtFirsItmLeft = parentsItemsGap / 2
    var partnersLeft = [`${prtFirsItmLeft}px`, `${prtFirsItmLeft + partnersWidth + parentsItemsGap}px`,
        `${prtFirsItmLeft + 2*(partnersWidth + parentsItemsGap)}px`,
        `${prtFirsItmLeft + 3*(partnersWidth + parentsItemsGap)}px`,
        `${prtFirsItmLeft + 4*(partnersWidth + parentsItemsGap)}px`,
    ]
    var partnersCrlsCounter = 1;
    var productsDropdownState = true;
    var productDropOpenState = [false, false, false, false];
    var productsDropdownBlockState = false;
    var aboutMainGrid = ["url('./images/about_us_1.jpg')", "url('./images/about_us_2.jpg')",
        "url('./images/about_us_3.jpg')", "url('./images/about_us_4.jpg')",
        "url('./images/about_us_5.jpg')"
    ]
    var aboutItemIndex = 0;

    //functions
    function reloadAnimation() {
        $(".reload_animation").css({ opacity: "1", zIndex: "1000" });
        setTimeout(function() {
            $(".reload_animation").css({ opacity: "0", zIndex: "-1000" });
        }, timeout)
    }

    function menuDropdownSlideUp() {
        if ($('.menu_icon img').css('left') == '-510px') {
            $(".menu_dropdown").slideUp();
            var increacer = -510;
            var menuIconInterval = setInterval(() => {
                increacer += 34;
                $('.menu_icon img').css({ left: `${increacer}px` });
                if ($('.menu_icon img').css('left') == '0px') {
                    clearInterval(menuIconInterval);
                }
                new_products_grid_item_name
            }, 30)
        }
    }

    function menuDropdownSlideDown() {
        if ($('.menu_icon img').css('left') == '0px') {
            $(".menu_dropdown").slideDown();
            var reducer = 0;
            var menuIconInterval = setInterval(() => {
                reducer -= 34;
                $('.menu_icon img').css({ left: `${reducer}px` });
                if ($('.menu_icon img').css('left') == '-510px') {
                    clearInterval(menuIconInterval);
                }
            }, 30)
        }
    }

    function displayPageAndAddActiveColor(index) {
        $(".header_cont_right_side_menu_item, .menu_dropdown_item, .footer_menu_item").removeClass("active_page");
        $(`.header_cont_right_side_menu_item${index}, .menu_dropdown_item${index}, .footer_menu_item${index}`).addClass("active_page");
        setTimeout(function() {
            $.each(pages, function(i, e) {
                $(`.${e}`).css("display", "none");
            })
            $(`.${pages[index]}`).css("display", "block");
        }, timeout)
    }

    function handlePageClicks(index) {
        $(`.menu_dropdown_item${index}, .header_cont_right_side_menu_item${index}, .footer_menu_item${index}`).click(function() {
            reloadAnimation();
            menuDropdownSlideUp();
            displayPageAndAddActiveColor(index);
        })
    }

    function productsDropdownSlide(index) {
        $(".products_dropdown_block_line_arrow").eq(index).click(function() {
            if (!productDropOpenState[`${index}`]) {
                $(".products_arrow_expand").eq(index).slideDown(300);
                setTimeout(function() {
                    productDropOpenState[`${index}`] = true;
                }, 300)
                return false;
            }
            if (productDropOpenState[`${index}`]) {
                $(".products_arrow_expand").eq(index).slideUp(300);
                setTimeout(function() {
                    productDropOpenState[`${index}`] = false;
                }, 300)
                return false;
            }
        })
    }

    function categoryDropMenu(index) {
        $(`.products_drop_on_hover${index}`).mouseover(function() {
            setTimeout(function() {
                if ($(`.products_drop_on_hover${index}:hover`).length != 0) {
                    $(".products_category_drop_cont_wrapper_inner").css("display", "none");
                    $(".products_category_drop_cont_wrapper_inner").eq(index).css("display", "flex");
                    $(".products_category_drop_cont_wrapper").slideDown(300)
                }
            }, 300)
        })
    }

    //ajax calls
    $.ajax({
        type: "GET",
        url: "http://localhost/PineTree/dbTables/menu.php",
        async: false,
        dataType: "JSON",
        success: function(data) {
            menuArray = data
        }
    })

    $.ajax({
        type: "GET",
        url: "http://localhost/PineTree/dbTables/partners.php",
        async: false,
        dataType: "JSON",
        success: function(data) {
            partnersArray = data;
        }
    })

    $.ajax({
        type: "GET",
        url: "http://localhost/PineTree/dbTables/news.php",
        async: false,
        dataType: "JSON",
        success: function(data) {
            newsArray = data;
        }
    })

    $.ajax({
        type: "GET",
        url: "http://localhost/PineTree/dbTables/products.php",
        async: false,
        dataType: "JSON",
        success: function(data) {
            productsArray = data;
        }
    })

    $.ajax({
        type: "GET",
        url: "http://localhost/PineTree/dbTables/clients.php",
        async: false,
        dataType: "JSON",
        success: function(data) {
            clientsArray = data;
        }
    })

    //give new products image and name (home page)
    $.each(productsArray, function(i, e) {
        $(`.new_products_grid_item_img${i+1}`).css('background-image', "url('./Images/products/" + e.product_img + "')")
        $(`.new_products_grid_item_name${i+1}`).text(`${e.product_name}`)
        if (i === 3) {
            return false
        }
    })


    //define left property of each partners carousel item(home page)
    $.each(partnersLeft, function(i, e) {
        $(`.partners_carousel_cont_item${i}`).css('left', `${e}`)
    })

    //give background image to each partners carousel item(home page)
    $.each(partnersArray, function(i, e) {
        $(`.partners_carousel_cont_item${i}`).css('background-image', "url('./Images/" + e.partner_img + "')")
    })

    // partners carousel
    $(".partners_cont_carousel_right_arrow").click(() => {
        if (partnersCrlsCounter < $(".partners_carousel_cont_item").length) {
            $(".partners_carousel_cont_item").css({ transform: `translateX(${-partnersCrlsCounter*(partnersWidth+parentsItemsGap)}px)` });
            partnersCrlsCounter++;
            if (partnersCrlsCounter === 5) {
                $(".partners_cont_carousel_right_arrow i").removeClass("partners_active_arrow");
                $(".partners_cont_carousel_right_arrow i").addClass("partners_passive_arrow");
            }
            $(".partners_cont_carousel_left_arrow i").removeClass("partners_passive_arrow");
            $(".partners_cont_carousel_left_arrow i").addClass("partners_active_arrow");
        }
    })

    $(".partners_cont_carousel_left_arrow").click(() => {
        if (partnersCrlsCounter <= $(".partners_carousel_cont_item").length && partnersCrlsCounter > 1) {
            partnersCrlsCounter -= 2;
            $(".partners_carousel_cont_item").css({ transform: `translateX(${-partnersCrlsCounter*(partnersWidth+parentsItemsGap)}px)` });
            partnersCrlsCounter++;
        }
        if (partnersCrlsCounter === 1) {
            $(".partners_cont_carousel_left_arrow i").removeClass("partners_active_arrow");
            $(".partners_cont_carousel_left_arrow i").addClass("partners_passive_arrow");
        }
        $(".partners_cont_carousel_right_arrow i").removeClass("partners_passive_arrow");
        $(".partners_cont_carousel_right_arrow i").addClass("partners_active_arrow");
    })

    $(window).resize(() => {
        $(".partners_carousel_cont_item").css({ "transform": "translateX(0px)" });
        partnersCrlsCounter = 1;
        partnersWidth = parseInt($(".partners_carousel_cont_item").css("width"));
        partnerCrslContWidth = parseInt($(".partners_carousel_cont").css("width"));
        parentsItemsGap = [partnerCrslContWidth % partnersWidth] / [(partnerCrslContWidth - partnerCrslContWidth % partnersWidth) / partnersWidth]
        prtFirsItmLeft = parentsItemsGap / 2
        partnersLeft = [`${prtFirsItmLeft}px`, `${prtFirsItmLeft + partnersWidth + parentsItemsGap}px`,
            `${prtFirsItmLeft + 2*(partnersWidth + parentsItemsGap)}px`,
            `${prtFirsItmLeft + 3*(partnersWidth + parentsItemsGap)}px`,
            `${prtFirsItmLeft + 4*(partnersWidth + parentsItemsGap)}px`,
        ]
        $.each(partnersLeft, (i, e) => {
            $(`.partners_carousel_cont_item${i}`).css('left', `${e}`)
        })
    })

    //change logo image on scroll on large screens
    $(window).scroll(() => {
        if ($(window).width() >= 1250) {
            if ($(window).scrollTop() > 0) {
                $(".header_cont").css("height", "70px")
                $(".logo").css("background-image", "url('./images/logo_2.svg')")
                $(".logo").css({ height: "53px", transform: "translate(-0.5px, 6.1px)" })
            } else {
                $(".header_cont").css("height", "100px")
                $(".logo").css("background-image", "url('./images/logo.svg')")
                $(".logo").css({ height: "70px", transform: "translate(0px)" })
            }
        }
    })

    //append menu pc items
    $.each(menuArray, function(i, e) {
        $(".header_cont_right_side_menu").append("<div class='header_cont_right_side_menu_item header_cont_right_side_menu_item" + i + "'>" + e.menu_en + "<div/>")
    })

    // append menu mobile items
    $.each(menuArray, function(i, e) {
        $(".menu_dropdown_items_cont").append("<div class='menu_dropdown_item menu_dropdown_item" + i + "'>" + e.menu_en + "<div/>")
    })

    //add green color to home page link
    $(".header_cont_right_side_menu_item0, .menu_dropdown_item0").addClass("active_page");

    //menu icon click animation
    $('.menu_icon').click(() => {
        menuDropdownSlideDown();
        menuDropdownSlideUp();
    })

    //header carousel
    $.each(headerImages, (i, e) => {
        $(".header_carousel").append('<div style="background-image:' + e + '" class="header_carousel_item"></div>')
    })

    $(".header_carousel_item").eq(0).css('opacity', '1')
    setInterval(() => {
        for (var i = 0; i < $(".header_carousel_item").length; i++) {
            $(".header_carousel_item").css('opacity', '0')
        }
        $(".header_carousel_item").eq(headerCrsCurrentItem).css('opacity', '1')
        headerCrsCurrentItem++;
        if (headerCrsCurrentItem === $(".header_carousel_item").length) {
            headerCrsCurrentItem = 0;
        }
    }, 1800)

    $(".language_pc_ge, .language_mobile_ge").click(function() {
        reloadAnimation();
        menuDropdownSlideUp();
        setTimeout(function() {
            $(".language_pc_en, .language_mobile_en").removeClass("active_language");
            $(".language_pc_ge, .language_mobile_ge").addClass("active_language");
            $.each(menuArray, function(i, e) {
                $(".header_cont_right_side_menu_item" + i + "").text(`${e.menu_ge}`)
                $(".menu_dropdown_item" + i + "").text(`${e.menu_ge}`)
            })
        }, timeout)
    })

    $(".language_pc_en, .language_mobile_en").click(function() {
        reloadAnimation();
        menuDropdownSlideUp();
        setTimeout(function() {
            $(".language_pc_ge, .language_mobile_ge").removeClass("active_language");
            $(".language_pc_en, .language_mobile_en").addClass("active_language");
            $.each(menuArray, function(i, e) {
                $(".header_cont_right_side_menu_item" + i + "").text(`${e.menu_en}`)
                $(".menu_dropdown_item" + i + "").text(`${e.menu_en}`)
            })
        }, timeout)
    })

    // show home page 
    $.each(pages, function(i, e) {
        $(`.${e}`).css("display", "none");
    })
    $(`.${pages[0]}`).css("display", "block");

    //logo click to home page 
    $(".logo").click(function() {
        reloadAnimation();
        menuDropdownSlideUp();
        displayPageAndAddActiveColor(0);
    })

    //home page click
    handlePageClicks(0);

    //products page click
    handlePageClicks(1);

    //partners page click
    handlePageClicks(2);

    //clients page click
    handlePageClicks(3);

    //news page click
    handlePageClicks(4);

    //about page click
    handlePageClicks(5);

    //contacts page click
    handlePageClicks(6);

    //news(home page)
    $.each(newsArray, function(i, e) {
        $(`.news_img_cont${i+1}`).css('background-image', "url('./Images/" + e.news_url + "')");
        $(`.news_product_title${i+1}`).text(`${e.news_name}`)
    })

    //products dropdown click handle

    //show text choose category(could be done in css but I like this way in this case)
    $(".products_dropdown").children().eq(0).css({ opacity: "1" });

    //handling products dropdown content's slides
    $(".products_dropdown").click(function() {
        if (!productsDropdownBlockState) {
            $(".products_dropdown>span").css({ opacity: "0" });
            $(".products_dropdown").children().eq(1).css({ opacity: "1" });
            $(".products_dropdown_block").slideDown(300);
            setTimeout(function() {
                productsDropdownBlockState = true;
            }, 300)
            return false;
        }
        if (productsDropdownBlockState) {
            for (var i = 0; i < productDropOpenState.length; i++) {
                $(".products_arrow_expand").eq(i).slideUp();
                productDropOpenState[`${i}`] = false;
            }
            $(".products_dropdown>span").css({ opacity: "0" });
            $(".products_dropdown").children().eq(0).css({ opacity: "1" });
            $(".products_dropdown_block").slideUp(300);
            setTimeout(function() {
                productsDropdownBlockState = false;
            }, 300)
            return false;
        }

    })

    //handle products dropdown expand blocks slides
    $(".products_arrow_expand").css("display", "none");
    productsDropdownSlide(0);
    productsDropdownSlide(1);
    productsDropdownSlide(2);
    productsDropdownSlide(3);

    var productsIcons = ["./images/category_icon1.png", "./images/category_icon2.png", "./images/category_icon3.png",
        "./images/category_icon4.png", "./images/category_icon5.png", "./images/category_icon6.png",
        "./images/category_icon7.png"
    ]

    var productsDropPcIcons = ["ch_cat_1.png", "ch_cat_2.png", "ch_cat_3.png", "ch_cat_4.png", "ch_cat_5.png",
        "ch_cat_6.png", "ch_cat_7.png", "ch_cat_8.png", "ch_cat_9.png", "ch_cat_10.png", "ch_cat_11.png", "ch_cat_12.png",
        "ch_cat_13.png", "ch_cat_14.png", "ch_cat_15.png", "ch_cat_16.png", "ch_cat_17.png", "ch_cat_18.png", "ch_cat_19.png"
    ]

    //give products_dropdown_pc_item_icon background image
    $.each(productsIcons, function(i, e) {
        $(".products_dropdown_pc_item_icon").eq(i).css("background-image", "url('" + e + "')");
    })

    //give products dropdown category menu icons bg image
    $.each(productsDropPcIcons, function(i, e) {
        $(".products_category_drop_icon").eq(i).css("background-image", "url('./Images/" + e + "')");
    })

    //products navigation dropdown on hover 
    categoryDropMenu(0);
    categoryDropMenu(1);
    categoryDropMenu(2);
    categoryDropMenu(3);

    $(".products_drop_on_hover").mouseleave(function() {
        setTimeout(function() {
            if ($(".products_drop_on_hover:hover").length == 0 && $(".products_category_drop_cont_wrapper_inner:hover").length == 0) {
                $(".products_category_drop_cont_wrapper").slideUp(300)
            }
        }, 300)
    })

    $(".products_category_drop_cont_wrapper_inner").mouseleave(function() {
        setTimeout(function() {
            if ($(".products_drop_on_hover:hover").length == 0 && $(".products_category_drop_cont_wrapper_inner:hover").length == 0) {
                $(".products_category_drop_cont_wrapper").slideUp(300)
            }
        }, 300)
    })

    //append product_main_grid
    $.each(productsArray, function(i, e) {
        $(".product_main_grid").append("<div class='product_main_grid_item product_main_grid_item" + i + "'></div>");
        $(".product_main_grid_item" + i + "").append("<div class='product_main_grid_item_img product_main_grid_item_img" + i + "'></div>");
        $(".product_main_grid_item_img" + i + "").css("background-image", "url('./Images/products/" + e.product_img + "')")
        $(".product_main_grid_item" + i + "").append("<div class='product_main_grid_item_name product_main_grid_item_name" + i + "'>" + e.product_name + "</div>");
        $(".product_main_grid_item" + i + "").append("<div class='product_main_grid_item_button product_main_grid_item_button" + i + "'>View Product</div>");
    })

    //append partners grid items
    $.each(partnersArray, function(i, e) {
        $(".partners_main_grid").append("<div class='partners_main_grid_item partners_main_grid_item" + i + "'></div>")
        $(`.partners_main_grid_item${i}`).css("background-image", "url('./Images/" + e.partner_img + "')");
    })

    //appending display_box_partners items
    $.each(partnersArray, function(i, e) {
        $(".display_box_partners_logo").append("<div class='display_box_partners_logo_item display_box_partners_logo_item" + i + "'></div>")
        $(".display_box_partners_link").append("<div class='display_box_partners_link_item display_box_partners_link_item" + i + "'></div>")
        $(".display_box_partners_logo_item" + i + "").css("background-image", "url('./Images/" + e.partner_img + "')");
        $(".display_box_partners_link_item" + i + "").text(" " + e.partner_link + " ");
    })

    //partners click makes dark bg visible
    $(".partners_carousel_cont_item").click(function(ev) {
        var index = $(ev.target).index();
        console.log(index);
        $(".fixed_dark_bg_cont_partners").css({ visibility: "visible", opacity: "1" });
        if ($(ev.target).attr("class") === "partners_carousel_cont_item partners_carousel_cont_item" + index + "") {
            $(".display_box_partners_logo_item, .display_box_partners_link_item").css("display", "none");
            $(`.display_box_partners_logo_item${index}, .display_box_partners_link_item${index}`).css("display", "block");
        }

    });
    $(".dark_bg_partners, .close_partners").click(() => {
        $(".fixed_dark_bg_cont_partners").css({ visibility: "hidden", opacity: "0" });
    });

    // append clients main grid 
    $.each(clientsArray, function(i, e) {
        $(".clients_main_grid").append("<div class='clients_main_grid_item clients_main_grid_item" + i + "'></div>")
        $(".clients_main_grid_item" + i + "").css("background-image", "url('./Images/" + e.client_img + "')")
    })

    //about page js

    //append grid items (about page)
    $.each(aboutMainGrid, (i) => {
        $(".about_main_grid_cont").append("<div class='about_main_grid_item about_main_grid_item" + i + "'></div>")
    })

    //give bg to grid items (about page)
    $.each(aboutMainGrid, (i, e) => {
        $(`.about_main_grid_item${i}`).css('background-image', `${e}`)
    })

    //on click display dark bg clos button and arrows (about pg)
    $(".about_main_grid_item").click((e) => {
        aboutItemIndex = $(e.target).index();
        setTimeout(() => {
            $(".close_about").css("transform", "translateX(0px)");
        }, 200)
        setTimeout(() => {
            $(".dark_about_arrow").css("transform", "translateX(0px)");
        }, 300)
        $(".dark_bg_about_img").css("background-image", `${$(e.target).css("background-image")}`)
        $(".fixed_dark_bg_about_cont").css({ visibility: "visible", opacity: "1" });
        if (aboutItemIndex === 4) {
            $(".dark_about_right_arrow").addClass("dark_about_arrow_passive");
        } else {
            $(".dark_about_right_arrow").removeClass("dark_about_arrow_passive");
        }
        if (aboutItemIndex === 0) {
            $(".dark_about_left_arrow").addClass("dark_about_arrow_passive");
        } else {
            $(".dark_about_left_arrow").removeClass("dark_about_arrow_passive");
        }
    });

    //closing dark bg about pg
    $(".dark_bg_about, .close_about").click(() => {
        $(".dark_about_right_arrow").css("transform", "translateX(150px)");
        $(".dark_about_left_arrow").css("transform", "translateX(-150px)");
        setTimeout(() => {
            $(".close_about").css("transform", "translateX(150px)");
        }, 200)
        setTimeout(() => {
            $(".fixed_dark_bg_about_cont").css({ visibility: "hidden", opacity: "0" });
        }, 300)
    });

    //arrow clicks on about page
    $(".dark_about_right_arrow").click(() => {
        $(".dark_about_left_arrow").removeClass("dark_about_arrow_passive");
        if (aboutItemIndex < 4) {
            aboutItemIndex++;
            $(".dark_bg_about_img").css("opacity", "0")
            setTimeout(() => {
                $(".dark_bg_about_img").css({
                    backgroundImage: "" + $(".about_main_grid_item" + aboutItemIndex + "").css("background-image") + "",
                    opacity: "1"
                })
            }, 300);
        }
        if (aboutItemIndex === 4) {
            $(".dark_about_right_arrow").addClass("dark_about_arrow_passive");
        }

    })

    $(".dark_about_left_arrow").click(() => {
        $(".dark_about_right_arrow").removeClass("dark_about_arrow_passive");
        if (aboutItemIndex > 0) {
            aboutItemIndex--;
            $(".dark_bg_about_img").css("opacity", "0")
            setTimeout(() => {
                $(".dark_bg_about_img").css({
                    backgroundImage: "" + $(".about_main_grid_item" + aboutItemIndex + "").css("background-image") + "",
                    opacity: "1"
                })
            }, 300);
        }
        if (aboutItemIndex === 0) {
            $(".dark_about_left_arrow").addClass("dark_about_arrow_passive");
        }
    })


































})