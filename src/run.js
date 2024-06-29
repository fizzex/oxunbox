// https://stackoverflow.com/a/36481059
function gaussianRandom(mean=0, stdev=1) {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

const randomChoice = (haystack) => {
  const idx = Math.floor(Math.random() * haystack.length);
  return haystack[idx];
}

const getRandomPossibility = (value) => {
  const number = parseInt(value.trim());
  if (!Number.isNaN(number)) {
    return Math.floor(gaussianRandom(67, 15)).toString();
  }

  console.log(value);
  if (value.trim().search(/class/i) !== -1) {
    return randomChoice(["First Class", "Second Class - Upper", "Second Class - Lower", "Third Class"]);
  }

  if (value.trim().search(/(pass|fail)/i) !== -1) {
    return randomChoice(["Pass", "Fail"]);
  }

  return ":P";
}

const valueToColours = (value) => {
  const number = parseInt(value.trim());
  let bg, shadow, color;
  if (Number.isNaN(number)) {
    if (value.search(/first/i) !== -1) {
      bg = "linear-gradient(169deg, rgba(254,255,159,1) 0%, rgba(255,241,55,1) 26%, rgba(200,153,0,1) 100%)";
      shadow = "rgba(255,255,255,0.5) 5px 10px 30px 0px inset";
      color = "white";
    } else if (value.search(/upper/i) !== -1) {
      bg = "linear-gradient(169deg, rgba(251,42,51,1) 0%, rgba(168,19,46,1) 26%, rgba(85,35,51,1) 100%)";
      shadow = "rgba(255,255,255,0.5) 5px 10px 30px 0px inset";
      color = "white";
    } else if (value.search(/lower/i) !== -1) {
      bg = "linear-gradient(169deg, rgba(251,42,220,1) 0%, rgba(185,73,191,1) 26%, rgba(73,45,82,1) 100%)";
      shadow = "rgba(255,255,255,0.5) 5px 10px 30px 0px inset";
      color = "white";
    } else if (value.search(/(third|pass)/i) !== -1) {
      bg = "linear-gradient(169deg, rgba(206,158,255,1) 0%, rgba(147,134,179,1) 26%, rgba(71,49,116,1) 100%)";
      shadow = "none";
      color = "black";
    } else {
      bg = "linear-gradient(169deg, rgba(231,231,231,1) 0%, rgba(201,198,198,1) 24%, rgba(136,136,136,1) 100%)";
      shadow = "none";
      color = "black";
    }
  } else {
    if (number < 50) {
      bg = "linear-gradient(169deg, rgba(231,231,231,1) 0%, rgba(201,198,198,1) 24%, rgba(136,136,136,1) 100%)";
      shadow = "none";
      color = "black";
    } else if (number < 60) {
      bg = "linear-gradient(169deg, rgba(143,203,240,1) 0%, rgba(141,179,208,1) 26%, rgba(43,88,154,1) 100%)";
      shadow = "none";
      color = "black";
    } else if (number < 70) {
      bg = "linear-gradient(169deg, rgba(206,158,255,1) 0%, rgba(147,134,179,1) 26%, rgba(71,49,116,1) 100%)";
      shadow = "none";
      color = "black";
    } else if (number < 80) {
      bg = "linear-gradient(169deg, rgba(251,42,220,1) 0%, rgba(185,73,191,1) 26%, rgba(73,45,82,1) 100%)";
      shadow = "rgba(255,255,255,0.5) 5px 10px 30px 0px inset";
      color = "white";
    } else if (number < 90) {
      bg = "linear-gradient(169deg, rgba(251,42,51,1) 0%, rgba(168,19,46,1) 26%, rgba(85,35,51,1) 100%)";
      shadow = "rgba(255,255,255,0.5) 5px 10px 30px 0px inset";
      color = "white";
    } else {
      bg = "linear-gradient(169deg, rgba(254,255,159,1) 0%, rgba(255,241,55,1) 26%, rgba(200,153,0,1) 100%)";
      shadow = "rgba(255,255,255,0.5) 5px 10px 30px 0px inset";
      color = "white";
    }
  }

  return {bg, shadow, color};
}


const hide = (table, inds, labelIdx) => {
  const labels = table.querySelectorAll(`td:nth-child(${labelIdx + 1})`);
  inds.forEach((i) => {
    const toHide = table.querySelectorAll(`td:nth-child(${i + 1})`);
    for (let j = 0; j < toHide.length; j++) {
      const el = toHide[j];

      if (el.innerHTML.trim() === "-" || el.innerHTML.trim() === "N/A") {
        continue;
      }
    
      el.setAttribute("data:value", el.innerHTML.trim());
      el.setAttribute("data:label", labels[j].innerHTML.trim());
      el.innerHTML = "UNBOX"
      el.style.background = "linear-gradient(137deg, rgba(255,254,0,1) 0%, rgba(255,199,0,1) 35%, rgba(208,133,8,1) 100%)";
      el.style.fontStyle = "italic";
      el.style.fontWeight = "bold";
      el.style.textAlign = "center";
      el.style.cursor = "pointer";
      el.style.position = "relative";

      // shifting background
      el.style.backgroundSize = "150% 150%";
      el.animate(
        [
          {
            offset: 0,
            backgroundPosition: "0% 68%",
            easing: ["ease"],
          },
          {
            offset: 0.50,
            backgroundPosition: "100% 33%",
            easing: ["ease"],
          },
          {
            offset: 1.00,
            backgroundPosition: "0% 68%",
            easing: ["ease"],
          },
        ],
        {
          duration: 3000 + Math.random() * 2000,
          iterationStart: Math.random(),
          iterations: Infinity,
        }
      );

      // blowup
      const onMouseover = () => {
        el.style.zIndex = 10;
        el.animate(
          [
            {
              offset: 0,
              transform: "scale(1.0)",
              easing: ["ease-out"],
            },
            {
              offset: 1,
              transform: "scale(1.2)",
            }
          ],
          {
            duration: 200,
            fill: "forwards",
          }
        );
      };
      el.addEventListener("mouseover", onMouseover);

      // deflate
      const onMouseout = () => {
        el.style.zIndex = 0;
        el.animate(
          [
            {
              offset: 0,
              transform: "scale(1.2)",
              easing: ["ease-out"],
            },
            {
              offset: 1,
              transform: "scale(1.0)",
            }
          ],
          {
            duration: 200,
            fill: "forwards",
          }
        );
      };
      el.addEventListener("mouseout", onMouseout);

      // unbox
      const onClick = () => {
        const value = el.getAttribute("data:value");
        el.removeEventListener("mouseover", onMouseover);
        el.removeEventListener("mouseout", onMouseout);
        el.removeEventListener("click", onClick);
        el.style.background = "white";
        el.style.fontStyle = "inherit";
        el.style.fontWeight = "inherit";
        el.style.textAlign = "inherit";
        el.style.cursor = "default";
        el.innerHTML = "";
        onMouseout();

        startUnbox(value, () => {
          el.innerHTML = el.getAttribute("data:value");
        })
      }
      el.addEventListener("click", onClick);
    }
  })
}

const startUnbox = (resultValue, onFinish) => {
  const positioningContainer = document.querySelector("#positioningContainer");
  const stripBg = document.querySelector("#stripBg");
  const strip = document.querySelector("#strip");
  const displayBoxContainer = document.querySelector("#displayBoxContainer");
  const displayBox = document.querySelector("#displayBox");
  const svgContainer = document.querySelector("#svgContainer");
  const displayBoxContent = document.querySelector("#displayBoxContent");

  const resultBoxIdx = 30; // index of box which contains result
  const resultRandomness = 0.95; // percentage of box width around centre within which we can land
  const boxWidth = 350;
  const boxMargin = 10;
  
  // cleanup
  const cleanup = () => {
    positioningContainer.style.display = "none";
    stripBg.style.display = "flex";
    displayBoxContainer.style.display = "none";
    strip.textContent = "";
    positioningContainer.removeEventListener("click", cleanup);

    onFinish();
  }

  // prepare boxes
  for (let i = 0; i < resultBoxIdx + 5; i++) {
    const box = document.createElement("div");
    strip.appendChild(box);
    box.style.display = "flex";
    box.style.width = `${boxWidth}px`;
    box.style.height = "90%";
    box.style.margin = `0 ${boxMargin}px`;
    box.style.flexShrink = "0";
    box.style.justifyContent = "center";
    box.style.alignItems = "center";
    box.style.filter = "drop-shadow(0px 0px 5px #555)";
    box.style.textAlign = "center";
    
    const inside = document.createElement("div");
    box.appendChild(inside);
    inside.style.fontWeight = "bold";
    inside.style.fontSize = "84px";
    
    let value;
    if (i === resultBoxIdx) {
      value = resultValue;
      // inside.style.color = "purple"; // DEBUG
    } else {
      value = getRandomPossibility(resultValue);
    }

    inside.textContent = value;

    if (value.length > 10) { 
      inside.style.fontSize = "48px";
    }

    // box stylisation
    const { bg, shadow, color } = valueToColours(value);
    box.style.background = bg;
    box.style.boxShadow = shadow;
    inside.style.color = color;
  }  

  positioningContainer.style.display = "flex";  
  stripBg.style.display = "flex";

  // animate 'roll'
  const duration = 7000 + Math.random() * 2000;
  strip.animate(
    [
      {
        offset: 0,
        left: "0",
        easing: ["cubic-bezier(.23,.59,.19,1)"],
      },
      {
        offset: 1.00,
        left: `${-Math.floor((boxWidth + 2*boxMargin) * resultBoxIdx + boxWidth/2 - window.innerWidth/2 + (Math.random() - 0.5)*resultRandomness*boxWidth)}px`,
      },
    ],
    {
      duration: duration, 
      fill: "forwards",
    }
  );


  // post-roll
  const postRoll = () => {
    stripBg.style.display = "none";

    const { bg, _, color } = valueToColours(resultValue);
    svgContainer.style.background = bg;
    svgContainer.style.filter = "drop-shadow(0px 0px 2px black)";
    displayBoxContent.style.color = color;
    displayBoxContent.textContent = resultValue;
  
    displayBoxContainer.style.display = "flex";
    displayBox.style.opacity = "0";
    displayBox.style.display = "block";
    displayBox.animate(
      [
        {
          offset: 0,
          opacity: 0,
          transform: "scale(0.5)",
          easing: ["ease-out"],
        },
        {
          offset: 1.00,
          opacity: 1,
          transform: "scale(1.0)",
        },
      ],
      {
        duration: 1000, 
        fill: "forwards",
      }
    );

    positioningContainer.addEventListener("click", cleanup);
  } 
  setTimeout(postRoll, duration + 1000);
}


const main = () => {
  // Early exit if on wrong page
  title = document.querySelector("h1");
  if (!title || title.innerHTML.trim() !== "Academic and Assessments Results") {
    document.body.style.display = "unset";
    return;
  }

  // setup
  const positioningContainer = document.createElement("div");
  document.body.appendChild(positioningContainer);
  positioningContainer.id = "positioningContainer";
  positioningContainer.style.width = "100vw";
  positioningContainer.style.height = "100vh";
  positioningContainer.style.position = "fixed";
  positioningContainer.style.top = "0";
  positioningContainer.style.left = "0";
  positioningContainer.style.display = "none"; // change to flex to display
  positioningContainer.style.justifyContent = "center";
  positioningContainer.style.flexDirection = "column";
  positioningContainer.style.background = "rgba(0, 0, 0, 0.9)";
  positioningContainer.style.overflow = "none";

  const stripBg = document.createElement("div");
  positioningContainer.appendChild(stripBg);
  stripBg.id = "stripBg";
  stripBg.style.height = "250px";
  stripBg.style.width = "100vw";
  stripBg.style.backdropFilter = "blur(10px)";
  stripBg.style.background = "rgba(255, 255, 255, 0.5)";

  const strip = document.createElement("div");
  stripBg.appendChild(strip);
  strip.id = "strip";
  strip.style.position = "relative";
  strip.style.left = "0";
  strip.style.height = "250px";
  strip.style.display = "flex";
  strip.style.alignItems = "center";

  const stripCentrum = document.createElement("div");
  stripBg.appendChild(stripCentrum);
  stripCentrum.style.display = "block";
  stripCentrum.style.height = "100%";
  stripCentrum.style.width = "6px";
  stripCentrum.style.background = "white";
  stripCentrum.style.filter = "drop-shadow(0px 0px 5px black)";
  stripCentrum.style.position = "absolute";
  stripCentrum.style.top = "0";
  stripCentrum.style.left = "calc(50vw - 6px)";
  stripCentrum.style.zIndex = "5";

  const displayBoxContainer = document.createElement("div");
  positioningContainer.appendChild(displayBoxContainer);
  displayBoxContainer.id = "displayBoxContainer";
  displayBoxContainer.style.width = "100vw";
  displayBoxContainer.style.display = "none"; // flex to display
  displayBoxContainer.style.justifyContent = "center";

  const displayBox = document.createElement("div");
  displayBoxContainer.appendChild(displayBox);
  displayBox.id = "displayBox";
  displayBox.style.width = "400px";
  displayBox.style.height = "400px";
  displayBox.style.position = "relative";

  const svgContainer = document.createElement("div");
  displayBox.appendChild(svgContainer);
  svgContainer.id = "svgContainer";
  svgContainer.style.position = "absolute";
  svgContainer.style.top = "0";
  svgContainer.style.left = "0";
  svgContainer.style.zIndex = "1";
  svgContainer.style.width = "100%";
  svgContainer.style.height = "100%";
  svgContainer.style.background = "red";
  svgContainer.style.maskImage = `url(${chrome.runtime.getURL("star.svg")})`;

  svgContainer.animate(
    [
      {
        offset: 0,
        transform: "rotate(0)",
      },
      {
        offset: 1.00,
        transform: "rotate(360deg)",
      },
    ],
    {
      duration: 20000,
      iterations: Infinity, 
    }
  );

  const displayBoxContent = document.createElement("div");
  displayBox.appendChild(displayBoxContent);
  displayBoxContent.id = "displayBoxContent";
  displayBoxContent.style.position = "absolute";
  displayBoxContent.style.top = "0";
  displayBoxContent.style.left = "0";
  displayBoxContent.style.zIndex = "2";
  displayBoxContent.style.width = "100%";
  displayBoxContent.style.height = "100%";
  displayBoxContent.style.display = "flex";
  displayBoxContent.style.alignItems = "center";
  displayBoxContent.style.justifyContent = "center";
  displayBoxContent.style.fontSize = "84px";
  displayBoxContent.style.fontWeight = "bold";
  displayBoxContent.style.textAlign = "center";

  // init
  const tables = document.getElementsByClassName("sitstablegrid");

  const overall = tables[0];
  hide(overall, [2, 3], 0);

  const years = tables[1];
  hide(years, [2], 0);

  const detailed = tables[2];
  hide(detailed, [4, 5], 2);

  document.body.style.display = "unset";
}


main()