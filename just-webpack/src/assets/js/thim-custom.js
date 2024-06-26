(function (e) {
  "use strict";
  var i = {
    ready: function () {
      this.turnoff_autocompleteinput(),
        this.feature_preloading(),
        this.back_to_top(),
        this.header_menu(),
        this.header_menu_mobile(),
        this.login_popup(),
        this.login_error(),
        this.slide_slick_col(),
        this.select2(),
        this.search_open(),
        this.magnific_popup_video(),
        this.input_num_product(),
        this.thim_tabs(),
        this.grid_isotope_filter(),
        this.custom_input_file(),
        this.popup_form(),
        this.validate_form(),
        this.fillter_full_container();
    },
    load: function () {
      this.bp_grid_isotope(), this.sticky_sidebar();
    },
    turnoff_autocompleteinput: function () {
      try {
        e("input").attr("autocomplete", "off");
      } catch (e) {
        console.log(e);
      }
    },
    feature_preloading: function () {
      var i = e("#thim-preloading");
      i.length > 0 &&
        i.fadeOut(1e3, function () {
          i.remove();
        });
    },
    back_to_top: function () {
      var i = e("#back-to-top");
      e(window).on("scroll", function () {
        e(this).scrollTop() > 100
          ? i.addClass("scrolldown").removeClass("scrollup")
          : i.addClass("scrollup").removeClass("scrolldown");
      }),
        i.on("click", function () {
          return e("html,body").animate({ scrollTop: "0px" }, 800), !1;
        });
    },
    header_menu: function () {
      var i =
          e("#wrapper-container").length > 0
            ? e("#wrapper-container").offset().top
            : 0,
        t = i;
      e(window).outerWidth() <= 600 && (t = 0);
      e("#toolbar");
      var n = e(".sticky-header"),
        o = n.find(".element-to-stick"),
        a = 0;
      e("#toolbar").length
        ? e(".header-overlay").css({
            top: e("#toolbar").outerHeight() + i + "px",
          })
        : e(".header-overlay").css({ top: i + "px" }),
        o.css("top", t + "px");
      var s = o.length > 0 ? o.offset().top - t : 0;
      e(window).on("resize", function () {
        e(this).scrollTop() > s &&
          (n.removeClass("fixed"), n.css("height", "auto")),
          (i =
            e("#wrapper-container").length > 0
              ? e("#wrapper-container").offset().top
              : 0),
          (t = i),
          e(window).outerWidth() <= 600 && (t = 0),
          e("#toolbar").length
            ? e(".header-overlay").css({
                top: e("#toolbar").outerHeight() + i + "px",
              })
            : e(".header-overlay").css({ top: i + "px" }),
          o.css("top", t + "px"),
          (s = o.length > 0 ? o.offset().top - t : 100),
          e(this).scrollTop() > s &&
            (n.css("height", n.outerHeight() + "px"), n.addClass("fixed"));
      }),
        e(window).scroll(function () {
          var i = e(this).scrollTop();
          i > s
            ? (n.css("height", n.outerHeight() + "px"), n.addClass("fixed"))
            : (n.removeClass("fixed"), n.css("height", "auto")),
            i > a && i > o.outerHeight() + s
              ? n.hasClass("menu-hidden") ||
                (n.addClass("menu-hidden"), o.css({ top: -o.outerHeight() }))
              : n.hasClass("menu-hidden") &&
                (n.removeClass("menu-hidden"), o.css({ top: t })),
            (a = i);
        });
    },
    header_menu_mobile: function () {
      e("#primaryMenu");
      e(document).on("click", ".menu-mobile-effect", function (i) {
        i.stopPropagation(),
          e(".responsive #wrapper-container").toggleClass("mobile-menu-open"),
          e(".responsive #wrapper-container").hasClass("mobile-menu-open")
            ? e("body").css("overflow", "hidden")
            : e("body").css("overflow", "auto");
      }),
        e(document).on("click", ".mobile-menu-open", function () {
          e(".responsive #wrapper-container.mobile-menu-open").removeClass(
            "mobile-menu-open"
          ),
            e("body").css("overflow", "auto");
        }),
        e(
          ".responsive .mobile-menu-container .navbar-nav>li.menu-item-has-children >a"
        ).after(
          '<span class="icon-toggle"><i class="fa fa-angle-down"></i></span>'
        ),
        e(
          ".mobile-menu-container .widget_nav_menu .menu-useful-links-container .menu>li.menu-item-has-children >a"
        ).after(
          '<span class="icon-toggle"><i class="fa fa-angle-down"></i></span>'
        ),
        e(
          ".responsive .mobile-menu-container .navbar-nav>li.menu-item-has-children .icon-toggle, .mobile-menu-container .widget_nav_menu .menu-useful-links-container .menu>li.menu-item-has-children .icon-toggle"
        ).on("click", function () {
          e(this).next("ul.sub-menu").is(":hidden")
            ? (e(this).next("ul.sub-menu").slideDown(200, "linear"),
              e(this).html('<i class="fa fa-angle-up"></i>'))
            : (e(this).next("ul.sub-menu").slideUp(200, "linear"),
              e(this).html('<i class="fa fa-angle-down"></i>'));
        }),
        e(".mobile-menu-container").on("click", function (e) {
          e.stopPropagation();
        });
    },
    slide_slick_col: function () {
      e(".js-call-slick-col").each(function () {
        function i(i) {
          for (var t = e(r[i]).find("[data-appear]"), n = 0; n < p.length; n++)
            clearTimeout(p[n]);
          e(c).each(function () {
            e(this)
              .removeClass(e(this).data("appear"))
              .css("visibility", "hidden");
          });
          for (n = 0; n < t.length; n++)
            p[n] = setTimeout(
              function (i) {
                e(t[i])
                  .addClass(e(t[i]).data("appear"))
                  .css("visibility", "visible");
              },
              e(t[n]).data("delay"),
              n
            );
        }
        var t = [
            ["responsive", "array"],
            ["customdot", "bool"],
            ["numofshow", "number"],
            ["numofscroll", "number"],
            ["fade", "bool"],
            ["loopslide", "bool"],
            ["autoscroll", "bool"],
            ["speedauto", "number"],
            ["verticalslide", "bool"],
            ["verticalswipe", "bool"],
            ["rtl", "bool"],
            ["navfor", "string"],
            ["animate", "bool"],
            ["middlearrow", "string"],
          ],
          n = {
            responsive: [
              [1, 1],
              [1, 1],
              [1, 1],
              [1, 1],
              [1, 1],
            ],
            customdot: !1,
            numofshow: 1,
            numofscroll: 1,
            fade: !1,
            loopslide: !1,
            autoscroll: !1,
            speedauto: 5e3,
            verticalslide: !1,
            verticalswipe: !1,
            rtl: !1,
            navfor: "",
            animate: !1,
            middlearrow: null,
          },
          o = !1,
          a = !1,
          s = e(this),
          l = e(this).find(".slide-slick"),
          r = e(l).find(".item-slick"),
          c = e(l).find("[data-appear]"),
          p = [];
        e(s).find(".wrap-dot-slick").length > 0 && (o = !0),
          e(s).find(".wrap-arrow-slick").length > 0 && (a = !0);
        for (var d = 0; d < t.length; d++) {
          var u = e(this).data(t[d][0]);
          if (null != u)
            if ("bool" === t[d][1]) n[t[d][0]] = "1" === u || 1 === u;
            else if ("number" === t[d][1]) n[t[d][0]] = Number(u);
            else if ("string" === t[d][1]) n[t[d][0]] = u;
            else if ("array" === t[d][1]) {
              var f = u.match(/(\d+)/g);
              n[t[d][0]] = [
                [Number(f[0]), Number(f[1])],
                [Number(f[2]), Number(f[3])],
                [Number(f[4]), Number(f[5])],
                [Number(f[6]), Number(f[7])],
                [Number(f[8]), Number(f[9])],
              ];
            }
        }
        n.animate &&
          (e(c).addClass("animated").css("visibility", "hidden"),
          e(l).on("init", function () {
            i(0);
          })),
          e(l)
            .slick({
              asNavFor: n.navfor,
              rtl: n.rtl,
              vertical: n.verticalslide,
              verticalSwiping: n.verticalswipe,
              pauseOnFocus: !1,
              pauseOnHover: !0,
              slidesToShow: n.numofshow,
              slidesToScroll: n.numofscroll,
              fade: n.fade,
              infinite: n.loopslide,
              autoplay: n.autoscroll,
              autoplaySpeed: n.speedauto,
              arrows: a,
              appendArrows: e(s).find(".wrap-arrow-slick"),
              prevArrow: e(s).find(".prev-slick"),
              nextArrow: e(s).find(".next-slick"),
              dots: o,
              appendDots: e(s).find(".wrap-dot-slick"),
              dotsClass: "dots-slick",
              customPaging: function (i, t) {
                var o = e(i.$slides[t]).data("thumb");
                return n.customdot
                  ? '<img src=" ' + o + ' "/>'
                  : "<span></span>";
              },
              responsive: [
                {
                  breakpoint: 1368,
                  settings: {
                    slidesToShow: n.responsive[0][0],
                    slidesToScroll: n.responsive[0][1],
                  },
                },
                {
                  breakpoint: 1199,
                  settings: {
                    slidesToShow: n.responsive[1][0],
                    slidesToScroll: n.responsive[1][1],
                  },
                },
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: n.responsive[2][0],
                    slidesToScroll: n.responsive[2][1],
                  },
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: n.responsive[3][0],
                    slidesToScroll: n.responsive[3][1],
                  },
                },
                {
                  breakpoint: 575,
                  settings: {
                    slidesToShow: n.responsive[4][0],
                    slidesToScroll: n.responsive[4][1],
                  },
                },
              ],
            })
            .on("setPosition", function (i, t) {
              if (
                "1" === e(this).parent().data("equalheight") ||
                1 === e(this).parent().data("equalheight")
              ) {
                var o = 0,
                  a = e(this).find(".item-slick");
                a.each(function () {
                  e(this).outerHeight() > o && (o = e(this).outerHeight());
                }),
                  a.css("min-height", o);
              }
              if (null != n.middlearrow) {
                var l = e(s).find(".wrap-arrow-slick"),
                  r = e(s).find(n.middlearrow).outerHeight();
                l.css("height", r + "px");
              }
            }),
          n.animate &&
            e(l).on("afterChange", function (e, t, n) {
              i(n);
            });
      });
    },
    // 全登录
    login_popup: function () {
      e(".login-popup").on("click", ".display-box", function (i) {
        i.preventDefault();
        var t = e(this).attr("data-display");
        e(".login-popup" + t)
          .addClass("active")
          .siblings()
          .removeClass("active");
      });
      var i = e(".login-links .login").attr("href");
      e(window).width() >= 992
        ? (e(".login-links .login").attr("href", "#bp-popup-login"),
          e(".login-links .login").magnificPopup({
            type: "inline",
            removalDelay: 500,
            fixedContentPos: !1,
            callbacks: {
              beforeOpen: function () {
                this.st.mainClass = this.st.el.attr("data-effect");
              },
              open: function () {
                var i = this.st.el.attr("data-active");
                e(".login-popup" + i)
                  .addClass("active")
                  .siblings()
                  .removeClass("active");
              },
            },
            midClick: !0,
          }),
          e(".login-links .register").magnificPopup({
            type: "inline",
            removalDelay: 500,
            callbacks: {
              beforeOpen: function () {
                this.st.mainClass = this.st.el.attr("data-effect");
              },
              open: function () {
                var i = this.st.el.attr("data-active");
                e(".login-popup" + i)
                  .addClass("active")
                  .siblings()
                  .removeClass("active");
              },
            },
            midClick: !0,
          }))
        : e(".login-links .login").attr("href", i),
        // 注册按钮
        e("#bp-popup-login #loginform").on("submit", function (i) {
          var t = e("#bp-popup-login"),
            n = t.find("#bp_login_name").val(),
            o = t.find("#bp_login_pass").val();
          if ("" !== n && "" !== o) {
            t.addClass("loading"), t.find(".message").slideDown().remove();
            var a = {
              action: "builderpress_login_ajax",
              username: n,
              password: o,
              remember: t.find("#rememberme").val(),
            };
            return (
              e.post(ajaxurl, a, function (e) {
                try {
                  var i = JSON.parse(e);
                  t.find(".login-popup .inner-login").append(i.message),
                    "1" === i.code && location.reload(),
                    t.removeClass("loading");
                } catch (e) {
                  return !1;
                }
              }),
              i.preventDefault(),
              !1
            );
          }
        });
    },
    login_error: function () {
      e(".login-popup form#loginform").submit(function (i) {
        var t = e(this),
          n = t.find("#bp_login_name, #bp_login_name_ac"),
          o = t.find("#bp_login_pass, #bp_login_pass_ac");
        n.length > 0 &&
          "" === n.val() &&
          (n.addClass("invalid"), i.preventDefault()),
          o.length > 0 &&
            "" === o.val() &&
            (o.addClass("invalid"), i.preventDefault());
      }),
        e(".login-popup form#registerform").submit(function (i) {
          var t = e(this),
            n = t.find("#user_login_register"),
            o = t.find("#user_email"),
            a = t.find("#password"),
            s = t.find("#repeat_password"),
            l = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim;
          n.length > 0 &&
            "" === n.val() &&
            (n.addClass("invalid"), i.preventDefault()),
            o.length > 0 &&
              ("" === o.val() || !l.test(o.val())) &&
              (o.addClass("invalid"), i.preventDefault()),
            (a.val() === s.val() && "" !== a.val()) ||
              (a.addClass("invalid"),
              s.addClass("invalid"),
              i.preventDefault());
        }),
        e(".login-popup form#lostpasswordform").submit(function (i) {
          var t = e(this),
            n = t.find("#user_login_lostpass");
          n.length > 0 &&
            "" === n.val() &&
            (n.addClass("invalid"), i.preventDefault());
        }),
        e(
          ".login-popup #bp_login_name, .login-popup #bp_login_pass, .login-popup #user_login_lostpass, .login-popup #user_login_register, .login-popup #bp_login_name_ac, .login-popup #bp_login_pass_ac"
        ).on("focus", function () {
          e(this).removeClass("invalid");
        });
    },
    bp_grid_isotope: function () {
      e().isotope &&
        e(".grid-isotope").isotope({
          itemSelector: ".grid-item",
          percentPosition: !0,
          masonry: { columnWidth: ".grid-sizer" },
        });
    },
    select2: function () {
      try {
        e("select").each(function () {
          e(this).parent().hasClass("wrap-select2") ||
            e(this).parent().addClass("wrap-select2");
        }),
          e(".wrap-select2").each(function () {
            e(this).append('<span class="dropDownSelect2"></span>');
            var i = e(this).children("select"),
              t = e(this).data("style"),
              n = e(this).children(".dropDownSelect2");
            e(i).select2({
              minimumResultsForSearch: 20,
              dropdownParent: n,
              theme: t,
            });
          });
      } catch (e) {
        console.log(e);
      }
    },
    search_open: function () {
      var i = e(".bp-element-search"),
        t = i.find(".search-button"),
        n = i.find(".close-form"),
        o = i.find(".search-form"),
        a = i.find(".search-field");
      t.on("click", function () {
        o.addClass("open"),
          setTimeout(function () {
            a.focus();
          }, 800);
      }),
        n.on("click", function () {
          o.removeClass("open");
        }),
        e(window).keydown(function (e) {
          27 === e.which && o.removeClass("open");
        });
    },
    magnific_popup_video: function () {
      try {
        e(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
          disableOn: 700,
          type: "iframe",
          iframe: {
            patterns: {
              youtube: {
                index: "youtube.com/",
                id: function (e) {
                  var i = e.match(/[\\?\\&]v=([^\\?\\&]+)/);
                  return i && i[1] ? i[1] : null;
                },
                src: "https://www.youtube.com/embed/%id%?autoplay=1",
              },
            },
          },
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: !1,
          fixedContentPos: !1,
        });
      } catch (e) {
        console.log(e);
      }
    },
    input_num_product: function () {
      try {
        e(document).on("click", ".wrap-num-product .btn-num-down", function () {
          var i = Number(e(this).parent().find(".num-product").val());
          i > 0 &&
            e(this)
              .parent()
              .find(".num-product")
              .val(i - 1),
            e('.woocommerce-cart-form button[name="update_cart"]').removeAttr(
              "disabled"
            );
        }),
          e(document).on("click", ".wrap-num-product .btn-num-up", function () {
            var i = Number(e(this).parent().find(".num-product").val());
            e(this)
              .parent()
              .find(".num-product")
              .val(i + 1),
              e('.woocommerce-cart-form button[name="update_cart"]').removeAttr(
                "disabled"
              );
          });
      } catch (e) {
        console.log(e);
      }
    },
    thim_tabs: function () {
      try {
        e(".js-call-tabs").each(function () {
          var i = e(this).find(".thim-nav-tabs"),
            t = e(this).find(".thim-content-tabs");
          e(t).find(".tab-panel").hide();
          var n = e(i).find(".item-nav.active").data("panel");
          e(t)
            .find(".tab-panel[data-nav='" + n + "']")
            .show(),
            e(t)
              .find(".tab-panel[data-nav='" + n + "']")
              .addClass("active"),
            e(i)
              .find(".item-nav")
              .each(function () {
                e(this).on("click", function (n) {
                  n.preventDefault();
                  var o = e(this).data("panel");
                  e(t).find(".tab-panel").hide(),
                    e(t).find(".tab-panel").removeClass("active"),
                    e(i).find(".item-nav").removeClass("active"),
                    e(t)
                      .find(".tab-panel[data-nav='" + o + "']")
                      .show(),
                    e(t)
                      .find(".tab-panel[data-nav='" + o + "']")
                      .addClass("active"),
                    e(this).addClass("active");
                  for (var a = Number(e(this).data("step")), s = 1; s < a; s++)
                    e(i)
                      .find(".item-nav[data-step='" + s + "']")
                      .addClass("active");
                });
              });
        });
      } catch (e) {
        console.log(e);
      }
    },
    grid_isotope_filter: function () {
      try {
        e(".js-call-isotope-filter").each(function () {
          var i = e(this).find(".isotope-grid"),
            t = e(this).find(".filter-tope-group");
          t.on("click", ".item-tope", function () {
            var t = e(this).attr("data-filter");
            i.isotope({ filter: t });
          }),
            e(window).on("load", function () {
              i.each(function () {
                e(this).isotope({
                  itemSelector: ".isotope-item",
                  layoutMode: "fitRows",
                  percentPosition: !0,
                  animationEngine: "best-available",
                  masonry: { columnWidth: ".isotope-item" },
                });
              });
            });
          var n = t.find(".item-tope");
          n.each(function () {
            e(this).on("click", function () {
              n.removeClass("active"), e(this).addClass("active");
            });
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
    sticky_sidebar: function () {
      try {
        var i = 10,
          t = 10;
        e("#wpadminbar").length &&
          ((i += e("#wpadminbar").outerHeight()),
          (t += e("#wpadminbar").outerHeight())),
          e(".sticky-header .element-to-stick").length &&
            (i += e(".sticky-header .element-to-stick").outerHeight()),
          e(".sticky-sidebar").each(function () {
            e(this).length > 0 &&
              e().theiaStickySidebar &&
              e(this).theiaStickySidebar({
                typeSticky: 1,
                spacingTopDefault: t,
                containerSelector: "",
                additionalMarginTop: i,
                additionalMarginBottom: 10,
                updateSidebarHeight: !1,
                minWidth: 992,
                sidebarBehavior: "modern",
              });
          });
      } catch (e) {
        console.log(e);
      }
    },
    custom_input_file: function () {
      try {
        e(".input-choose-file").each(function () {
          var i = e(this).find('.input-field input[type="file"]'),
            t = e(this).find(".input-file-value");
          i.on("change", function () {
            t.html(i.val());
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
    validate_form: function () {
      try {
        var i = e(".require input, .require textarea");
        function t(i) {
          if ("" === e(i).val().trim()) return !1;
        }
        function n(i) {
          var t = e(i).parent();
          e(t).addClass("alert-validate");
        }
        function o(i) {
          var t = e(i).parent();
          e(t).removeClass("alert-validate");
        }
        e(".validate-form").on("submit", function () {
          for (var e = !0, o = 0; o < i.length; o++)
            !1 === t(i[o]) && (n(i[o]), (e = !1));
          return e;
        }),
          e(i).each(function () {
            e(this).on("focus", function () {
              o(this);
            });
          });
      } catch (e) {
        console.log(e);
      }
    },
    popup_form: function () {
      e(".js-popup-form").magnificPopup({
        type: "inline",
        preloader: !1,
        focus: "#name",
        callbacks: {
          beforeOpen: function () {
            (this.st.mainClass = this.st.el.attr("data-effect")),
              e(window).width() < 700
                ? (this.st.focus = !1)
                : (this.st.focus = "#name");
          },
        },
      });
    },
    fillter_full_container: function () {
      try {
        e(".js-filter-full-container").each(function () {
          var i = e(this),
            t = e(this).find(".toggle-filter"),
            n = e(this).find(".content-filter");
          e(i).hasClass("active-filter") ? e(n).show() : e(n).hide(),
            e(t).on("click", function (t) {
              t.preventDefault(),
                t.stopPropagation(),
                e(i).hasClass("active-filter")
                  ? (e(i).removeClass("active-filter"), e(n).slideUp("fast"))
                  : (e(i).addClass("active-filter"), e(n).slideDown("fast"));
            }),
            e(n).on("click", function (e) {
              e.stopPropagation();
            }),
            e(window).on("click", function () {
              e(i).removeClass("active-filter"), e(n).slideUp("fast");
            });
        });
      } catch (e) {
        console.log(e);
      }
    },
  };
  e(function () {
    i.ready();
  }),
    e(window).on("load", function () {
      i.load();
    });
})(jQuery);
