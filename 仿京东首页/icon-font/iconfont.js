;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-zuobiao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512.01535 1016.130775c0 0-358.409926-457.317587-358.409926-653.357472 0-196.004069 160.481018-354.905102 358.409926-354.905102 197.908442 0 358.379227 158.880567 358.379227 354.905102C870.394576 558.819328 512.01535 1016.130775 512.01535 1016.130775L512.01535 1016.130775 512.01535 1016.130775zM508.299725 258.497379c-58.170864 0-105.34835 46.707788-105.34835 104.34858 0 57.607022 47.170323 104.31788 105.34835 104.31788 58.202587 0 105.362676-46.706765 105.362676-104.31788C613.662401 305.220516 566.505381 258.497379 508.299725 258.497379L508.299725 258.497379 508.299725 258.497379zM508.299725 258.497379"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-arrowDown" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M527.929 750.768l438.277-431.027c6.798-6.686 6.891-17.619 0.203-24.42-6.686-6.801-17.62-6.891-24.42-0.203l-426.067 419.018-424.478-424.477c-6.743-6.743-17.677-6.743-24.42 0-3.372 3.372-5.058 7.792-5.058 12.211s1.687 8.84 5.058 12.211l436.584 436.584c6.705 6.705 17.56 6.75 24.32 0.102z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-chevron-copy-copy-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M534.43 774.656l479.157-479.122c13.907-13.943 13.907-36.48 0-50.422-13.943-13.943-36.515-13.943-50.458 0l-455.765 455.73-448.241-448.205c-13.516-13.551-35.446-13.551-48.961 0-13.586 13.515-13.586 35.446 0 48.995l465.464 465.5c1.819 1.819 4.030 2.71 6.133 4.030 0.82 1.105 1.248 2.461 2.282 3.495 13.907 13.907 36.48 13.907 50.387 0z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-jiantou-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M891.367749 255.434623 511.980046 638.020158 129.436466 258.653945 66.206376 322.422294 512.550027 764.996085 955.123818 318.652434Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-jiantou-copy1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M787.022 370.401c9.078 11.638 9.842 26.229 1.7 32.587l-265.543 207.131c-1.837 1.441-7.738 4.983-8.741 6.097-9.894 10.935-24.119 14.219-31.792 7.295l-250.087-225.519c-7.673-6.93-5.901-21.429 3.992-32.391 9.893-10.956 24.119-14.225 31.818-7.301l227.603 205.236 259.856-202.702c8.167-6.357 22.133-2.064 31.193 9.568z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)