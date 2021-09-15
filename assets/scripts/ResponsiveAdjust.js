const Options = {
  minWidth: 480,
  maxWidth: 1365,
  measure: "rem"
}

const CSSDeclarations = [
  {
    selector: ":root",
    propAndValue: [
      { property: "--small", min: 1.6, max: 1.8 },
      { property: "--medium", min: 1.8, max: 2 },
      { property: "--large", min: 2.2, max: 2.5 },
      { property: "--social-icon", min: 3, max: 4.5 },
    ]
  },

  {
    selector: "h1",
    propAndValue: [
      { property: "font-size", min: 2.8, max: 4.5 },
    ]
  },

  {
    selector: "h2, h3",
    propAndValue: [
      { property: "font-size", min: 2.6, max: 3.5 },
    ]
  },
]

const ResponsiveAdjust = {
  createStyleEl() {
    const styleEl = document.createElement('style')
    styleEl.setAttribute("id", "responsive-adjust")
    document.querySelector('head').appendChild(styleEl)
    styleEl.insertAdjacentHTML("beforebegin", "<!-- Style injected by ResponsiveAdjust (github.com/ruuuff/responsive-adjust) -->")
  },

  scale(num, in_min, in_max, out_min, out_max) {
    let value = (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    
    value <= out_min ? value = out_min : value
    value >= out_max ? value = out_max : value

    return value
  },

  callScaleWithParameters(min, max) {
    return ResponsiveAdjust.scale(Number(document.documentElement.clientWidth), Number(Options.minWidth), Number(Options.maxWidth), Number(min), Number(max))
  },

  formatSize(sizeToFormat) {
    return parseFloat(sizeToFormat.toFixed(3))
  },

  innerStyles() {
    const style = document.querySelector('head style#responsive-adjust')
    style.innerHTML = ""

    CSSDeclarations.forEach(({ selector, propAndValue }, index) => {
      style.insertAdjacentHTML("beforeend", `${selector} {`)

      propAndValue.forEach(({ property, min, max }) => {
        const size = ResponsiveAdjust.formatSize(ResponsiveAdjust.callScaleWithParameters(min, max))

        style.insertAdjacentHTML("beforeend", `  ${property}: ${size + Options.measure};`)
      })
      style.insertAdjacentHTML("beforeend", index !== CSSDeclarations.length - 1 ? `}
      ` : `}`)
    })
  },
}

ResponsiveAdjust.createStyleEl()
ResponsiveAdjust.innerStyles()
window.addEventListener('resize', ResponsiveAdjust.innerStyles)