//The function for creating a singular LP object
function createLP(index) {
  //Creates container for a single LP
  const LP = document.createElement("div");
  LP.className = "LP";

  // Set z-index to ensure proper stacking (higher index = closer to front)
  LP.style.zIndex = index;
  // Apply offset for cascading effect (e.g., 10px per LP)
  LP.style.transform = `translateY(${index * 10}px)`;

  //Creates the actual LP cover object
  const LPCover = document.createElement("div");
  LPCover.className = "LP-cover";

  //Creates the front of the LP cover art and ascribes the art
  const front = document.createElement("div");
  front.className = "LP-front";

  const frontCover = document.createElement("img");
  frontCover.className = "LP-image";
  frontCover.src = "/testingCovers/abbeyroadFrontCover.jpg";
  frontCover.loading = "lazy";
  front.appendChild(frontCover);

  //Creates the back of the LP cover art and ascribes the art
  const back = document.createElement("div");
  back.className = "LP-back";

  const backCover = document.createElement("img");
  backCover.className = "LP-image";
  backCover.src = "/testingCovers/abbeyroadBackCover.jpg";
  backCover.loading = "lazy";
  back.appendChild(backCover);

  //Puts the art on the cover front and back, and adds the cover to the LP container
  LPCover.appendChild(front);
  LPCover.appendChild(back);
  LP.appendChild(LPCover);

  //Waits for someone to click the cover so it can flip
  LP.addEventListener("click", () => {
    LP.classList.toggle("flipped");
  });

  return LP;
}

//The function called to add an LP to the crate div
export function addLP(count = 1) {
  const crate = document.getElementById("crate");
  // Add the specified number of LPs
  for (let i = 0; i < count; i++) {
    const LP = createLP(i);
    crate.appendChild(LP);
  }
}
