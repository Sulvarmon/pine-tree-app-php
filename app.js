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
    function winScr() {
        $(window).scrollTop(0);
    }

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
            winScr()
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


    function categoryClicks(index, category) {
        reloadAnimation()
        setTimeout(function() {
            winScr()
            if (index > 4) {
                $(".no_info").css("display", "block");
            } else {
                $(".no_info").css("display", "none");
            }
            $(".products_arrow_expand_item").removeClass("active_page");
            $(".products_dropdown_pc_item_name").removeClass("active_page");
            $(".products_dropdown_pc_item_name").eq(index).addClass("active_page");
            $(".products_dropdown_block_line_text").removeClass("active_page");
            $(".products_dropdown_block_line_text").eq(index - 1).addClass("active_page");
            if (index === 0) {
                $(".products_dropdown_block_line_text").removeClass("active_page")
                $(".products_pages_indicators").css("display", "flex");
                $(".products_pages_indicators_item").removeClass("active_page");
                $(".products_pages_indicators_item").eq(index).addClass("active_page");
                $(".product_main_grid_item").css("display", "none");
                for (var i = 0; i < 16; i++) {
                    $(`.product_main_grid_item${i}`).css("display", "flex");
                }
            } else {
                $(".products_pages_indicators").css("display", "none")
                $(".products_pages_indicators_item").removeClass("active_page");
                $(".product_main_grid_item").css("display", "none");
                $.each(productsArray, function(i, e) {
                    if (e.product_category === category) {
                        $(`.product_main_grid_item${i}`).css("display", "flex");
                    }
                })
            }
        }, timeout)
    }

    function categoryClicksMobile(index, category) {
        reloadAnimation()
        $(".products_dropdown_block").slideUp(300);
        productsDropdownBlockState = false;
        setTimeout(function() {
            winScr()
            if (index > 3) {
                $(".no_info").css("display", "block");
            } else {
                $(".no_info").css("display", "none");
            }
            $(".products_arrow_expand_item").removeClass("active_page");
            $(".products_dropdown_block_line_text").removeClass("active_page");
            $(".products_dropdown_block_line_text").eq(index).addClass("active_page");
            $(".products_dropdown_pc_item_name").removeClass("active_page");
            $(".products_dropdown_pc_item_name").eq(index + 1).addClass("active_page");
            $(".products_pages_indicators").css("display", "none")
            $(".products_pages_indicators_item").removeClass("active_page");
            $(".products_pages_indicators_item").eq(index).addClass("active_page");
            $(".product_main_grid_item").css("display", "none");
            $.each(productsArray, function(i, e) {
                if (e.product_category === category) {
                    $(`.product_main_grid_item${i}`).css("display", "flex");
                }
            })
        }, timeout)
    }

    function subcategoryClicks(indexCategory, indexSubCategory, sub) {
        reloadAnimation()
        $(".products_dropdown_block").slideUp(300);
        productsDropdownBlockState = false;
        setTimeout(function() {
            $(".products_pages_indicators").css("display", "none");
            $(".product_main_grid_item").css("display", "none");
            $(".products_dropdown_pc_item_name").removeClass("active_page");
            $(".products_dropdown_block_line_text").removeClass("active_page");
            $(".products_arrow_expand_item").removeClass("active_page");
            $(".products_category_drop_name").removeClass("active_page");
            if (sub === "juice" || sub === "tea") {
                $(".no_info").css("display", "block")
            } else {
                $(".no_info").css("display", "none")
                $.each(productsArray, function(i, e) {
                    if (e.product_subcategory === sub) {
                        $(".product_main_grid_item").eq(i).css("display", "flex")
                    }
                })
            }
            $(".products_dropdown_pc_item_name").eq(indexCategory + 1).addClass("active_page");
            $(".products_dropdown_block_line_text").eq(indexCategory).addClass("active_page");
            $(".products_arrow_expand_item").eq(indexSubCategory).addClass("active_page");
            $(".products_category_drop_name").eq(indexSubCategory).addClass("active_page");
            console.log(indexCategory)
        }, timeout)
    }

    //scroll window to top after refresh
    $(window).on('beforeunload', function() {
        winScr()
    });

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
        $(`.new_products_grid_item_img${i+1}`).css('background-image', "url('./Images/products/" + e.product_img.replace("big", "") + "')")
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
        $(".product_main_grid_item_img" + i + "").css("background-image", "url('./Images/products/" + e.product_img.replace("big", "") + "')")
        $(".product_main_grid_item" + i + "").append("<div class='product_main_grid_item_name product_main_grid_item_name" + i + "'>" + e.product_name + "</div>");
        $(".product_main_grid_item" + i + "").append("<div class='product_main_grid_item_button product_main_grid_item_button" + i + "'>View Product</div>");
    })

    //do not display any of products items
    $(".product_main_grid_item").css("display", "none");

    //products items initial display (1 page)
    for (var i = 0; i < 16; i++) {
        $(`.product_main_grid_item${i}`).css("display", "flex");
    }

    //products pages ( 1-9 number clicks )
    $(".products_pages_indicators_item").click(function(ev) {
        reloadAnimation();
        setTimeout(function() {
            $(".products_pages_indicators_item").removeClass("active_page");
            $(ev.target).addClass("active_page");
            $(".product_main_grid_item").css("display", "none");
            var page = parseInt($(ev.target).text()) - 1;
            var index = page * 16;
            for (var i = index; i < index + 16; i++) {
                $(`.product_main_grid_item${i}`).css("display", "flex");
            }
            $(window).scrollTop(0)
        }, timeout)
    })

    //append partners grid items
    $.each(partnersArray, function(i, e) {
        $(".partners_main_grid").append("<div class='partners_main_grid_item partners_main_grid_item" + i + "'></div>")
        $(`.partners_main_grid_item${i}`).css("background-image", "url('./Images/" + e.partner_img + "')");
    })

    //give display_box_partners_items childrens logo title and link from database
    $.each(partnersArray, function(i, e) {
        $(".display_box_partners_item_logo").eq(i).css("background-image", "url('./Images/" + e.partner_img + "')");
        $(".display_box_partners_item_link").eq(i).text(`${e.partner_link}`);
        $(".display_box_partners_item_link").eq(i).attr("href", `${e.partner_link}`)
        $(".display_box_partners_item_title").eq(i).text(`${e.partner_name}`);
    })


    //partners click makes dark bg visible (home page)
    $(".partners_carousel_cont_item").click(function(ev) {
        var index = $(ev.target).index();
        $(".fixed_dark_bg_cont_partners").css({ visibility: "visible", opacity: "1" });
        if ($(ev.target).attr("class") === "partners_carousel_cont_item partners_carousel_cont_item" + index + "") {
            $(".display_box_partners_item").css("display", "none");
            $(`.display_box_partners_item${index}`).css("display", "flex");
        }

    });

    //partners click makes dark bg visible (partners page)
    $(".partners_main_grid_item").click(function(ev) {
        var index = $(ev.target).index();
        $(".fixed_dark_bg_cont_partners").css({ visibility: "visible", opacity: "1" });
        if ($(ev.target).attr("class") === "partners_main_grid_item partners_main_grid_item" + index + "") {
            $(".display_box_partners_item").css("display", "none");
            $(`.display_box_partners_item${index}`).css("display", "flex");
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

    /**home page button clicks */
    $(".all_news").click(function() {
        reloadAnimation();
        menuDropdownSlideUp();
        displayPageAndAddActiveColor(4);
    })

    $(".about_us_button").click(function() {
        reloadAnimation();
        menuDropdownSlideUp();
        displayPageAndAddActiveColor(5);
    })

    $(".new_products_cont_all_button").click(function() {
        reloadAnimation();
        menuDropdownSlideUp();
        displayPageAndAddActiveColor(1);
    })

    /**transform effect on news containers (home page) */
    setTimeout(function() {
        $(".news_cont").eq(0).css({ transform: "translateX(0px)", opacity: "1" });
    })
    setTimeout(function() {
        $(".news_cont").eq(1).css({ transform: "translateX(0px)", opacity: "1" });
    }, 500)



    $(window).scroll(function() {
        var elementTop = $(".new_products_grid_cont").offset().top;
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        if (viewportBottom > elementTop && $(".new_products_grid_item").eq(0).css("transform") === "matrix(1, 0, 0, 1, 150, 0)") {
            var newProductsTransformIndex = 0;
            var newProductsInterval = setInterval(function() {
                $(".new_products_grid_item").eq(newProductsTransformIndex).css({ transform: "translateX(0px)", opacity: "1" })
                newProductsTransformIndex++;
                if (newProductsTransformIndex === $(".new_products_grid_item").length) {
                    clearInterval(newProductsInterval);
                }
            }, 500)
        }
    })

    //news page news containers animation
    $(".header_cont_right_side_menu_item").click(function() {
        setTimeout(function() {
            $(".news_cont_news_pg").eq(0).css({ transform: "translateX(0px)", opacity: "1" });
        }, 500)
        setTimeout(function() {
            $(".news_cont_news_pg").eq(1).css({ transform: "translateX(0px)", opacity: "1" });
        }, 1000)
    })

    //click on category item ( large screens)
    $(".products_dropdown_pc_item").eq(0).click(function() {
        categoryClicks(0);
    })
    $(".products_dropdown_pc_item").eq(1).click(function() {
        categoryClicks(1, "baby_food");
    })
    $(".products_dropdown_pc_item").eq(2).click(function() {
        categoryClicks(2, "baby_care");
    })
    $(".products_dropdown_pc_item").eq(3).click(function() {
        categoryClicks(3, "confectionary");
    })
    $(".products_dropdown_pc_item").eq(4).click(function() {
        categoryClicks(4, "tea");
    })
    $(".products_dropdown_pc_item").eq(5).click(function() {
        categoryClicks(5);
    })
    $(".products_dropdown_pc_item").eq(6).click(function() {
        categoryClicks(6);
    })

    //click on category item ( mobile screens)
    $(".products_dropdown_block_line_text").eq(0).click(function() {
        categoryClicksMobile(0, "baby_food")
    })
    $(".products_dropdown_block_line_text").eq(1).click(function() {
        categoryClicksMobile(1, "baby_care")
    })
    $(".products_dropdown_block_line_text").eq(2).click(function() {
        categoryClicksMobile(2, "confectionary")
    })
    $(".products_dropdown_block_line_text").eq(3).click(function() {
        categoryClicksMobile(3, "tea")
    })
    $(".products_dropdown_block_line_text").eq(4).click(function() {
        categoryClicksMobile(4);
    })
    $(".products_dropdown_block_line_text").eq(5).click(function() {
        categoryClicksMobile(5);
    })

    //clicks on subcategory items ( mobile and large screens )
    $(".products_arrow_expand_item:eq(0), .products_category_drop_cont:eq(0)").click(function() {
        subcategoryClicks(0, 0, "juice");
    })
    $(".products_arrow_expand_item:eq(1), .products_category_drop_cont:eq(1)").click(function() {
        subcategoryClicks(0, 1, "tea");
    })
    $(".products_arrow_expand_item:eq(2), .products_category_drop_cont:eq(2)").click(function() {
        subcategoryClicks(0, 2, "cereal");
    })
    $(".products_arrow_expand_item:eq(3), .products_category_drop_cont:eq(3)").click(function() {
        subcategoryClicks(0, 3, "jar");
    })
    $(".products_arrow_expand_item:eq(4), .products_category_drop_cont:eq(4)").click(function() {
        subcategoryClicks(0, 4, "dessert");
    })
    $(".products_arrow_expand_item:eq(5), .products_category_drop_cont:eq(5)").click(function() {
        subcategoryClicks(0, 5, "special_milk");
    })
    $(".products_arrow_expand_item:eq(6), .products_category_drop_cont:eq(6)").click(function() {
        subcategoryClicks(0, 6, "milk_formula");
    })
    $(".products_arrow_expand_item:eq(7), .products_category_drop_cont:eq(7)").click(function() {
        subcategoryClicks(1, 7, "personal_care");
    })
    $(".products_arrow_expand_item:eq(8), .products_category_drop_cont:eq(8)").click(function() {
        subcategoryClicks(1, 8, "wet_wipe");
    })
    $(".products_arrow_expand_item:eq(9), .products_category_drop_cont:eq(9)").click(function() {
        subcategoryClicks(1, 9, "diaper");
    })
    $(".products_arrow_expand_item:eq(10), .products_category_drop_cont:eq(10)").click(function() {
        subcategoryClicks(2, 10, "turron");
    })
    $(".products_arrow_expand_item:eq(11), .products_category_drop_cont:eq(11)").click(function() {
        subcategoryClicks(2, 11, "chocolate");
    })
    $(".products_arrow_expand_item:eq(12), .products_category_drop_cont:eq(12)").click(function() {
        subcategoryClicks(2, 12, "biscuit");
    })
    $(".products_arrow_expand_item:eq(13), .products_category_drop_cont:eq(13)").click(function() {
        subcategoryClicks(3, 13, "wellness_tea");
    })
    $(".products_arrow_expand_item:eq(14), .products_category_drop_cont:eq(14)").click(function() {
        subcategoryClicks(3, 14, "pyramid");
    })
    $(".products_arrow_expand_item:eq(15), .products_category_drop_cont:eq(15)").click(function() {
        subcategoryClicks(3, 15, "leaf_tea_in_tin");
    })
    $(".products_arrow_expand_item:eq(16), .products_category_drop_cont:eq(16)").click(function() {
        subcategoryClicks(3, 16, "lea_tea");
    })
    $(".products_arrow_expand_item:eq(17), .products_category_drop_cont:eq(17)").click(function() {
        subcategoryClicks(3, 17, "enveloped_bag");
    })
    $(".products_arrow_expand_item:eq(18), .products_category_drop_cont:eq(18)").click(function() {
        subcategoryClicks(3, 18, "tea_bag");
    })

    //handle single product item clicks

    //create singe product single item images 
    $.each(productsArray, function(i, e) {
        $(".products_single_items_cont").append("<div class='products_single_item_img'></div>");
        $(".products_single_items_cont").append("<div class='products_single_item_name'></div>");
        $(`.products_single_item_img:eq(${i})`).css("background-image", 'url("./Images/products/' + e.product_img + '")')
        $(`.products_single_item_name:eq(${i})`).text(`${e.product_name}`)
    })

    function productsSingleItemClick(index) {
        reloadAnimation();
        setTimeout(function() {
            winScr()
            $(".product_main_grid_item, .products_pages_indicators, .products_single_item_img, .products_single_item_name").css("display", "none");
            $(`.products_single_items_cont, .products_single_item_img:eq(${index}), .products_single_item_name:eq(${index})`).css("display", "flex");
        }, timeout)
    }

    $(".product_main_grid_item:eq(0)").click(function() {
        productsSingleItemClick(0);
    })
    $(".product_main_grid_item:eq(1)").click(function() {
        productsSingleItemClick(1);
    })
    $(".product_main_grid_item:eq(2)").click(function() {
        productsSingleItemClick(2);
    })
    $(".product_main_grid_item:eq(3)").click(function() {
        productsSingleItemClick(3);
    })

    //hide items on category click
    $(".products_dropdown_pc_item").click(function() {
        setTimeout(function() {
            $(".products_single_items_cont").css("display", "none")
        }, timeout)
    })




























})