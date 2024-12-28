const content = document.getElementById("content");
const img = document.createElement("img");
const randomBtn = document.getElementById("button-random-dog");
const subBreedBtn = document.getElementById("button-show-sub-breed");
async function getRandomDog() {
  content.innerHTML = "";
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await response.json();
  img.src = data.message;
  img.classList.add("w-96", "rounded-lg", "shadow-xl", "mx-auto");
  content.append(img);
}

const showBreedBtn = document.getElementById("button-show-breed");
const inputBreed = document.getElementById("input-breed");
const showAllBtn = document.getElementById("button-show-all");

async function getBreedImages(breed) {
  content.innerHTML = "";
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    if (data.code === 404) {
      throw new Error("Breed not found!");
    }
    img.src = data.message[0];
    img.classList.add("w-96", "rounded-lg", "shadow-xl", "mx-auto");
    content.append(img);
  } catch (error) {
    const p = document.createElement("p");
    p.innerText = "Breed not found!";
    p.classList.add("text-red-500", "font-semibold", "text-center");
    content.append(p);
  }
}

async function getSubBreed(breed) {
  content.innerHTML = "";
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/list`);
    const data = await response.json();
    if (data.code === 404) {
      throw new Error("Breed not found!");
    }
    if (data.message.length === 0) {
      const p = document.createElement("p");
      p.innerText = "No sub-breeds found!";
      p.classList.add("text-yellow-500", "font-semibold", "text-center");
      content.append(p);
    } else {
      const arr = data.message;
      const list = document.createElement("ol");
      content.append(list);
      for (let item of arr) {
        const li = document.createElement("li");
        li.classList.add("text-lg", "text-gray-700", "mb-2");
        li.innerText = item;
        list.appendChild(li);
      }
    }
  } catch (error) {
    const p = document.createElement("p");
    p.innerText = "Breed not found!";
    p.classList.add("text-red-500", "font-semibold", "text-center");
    content.append(p);
  }
}

async function getAllBreeds() {
  content.innerHTML = "";
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  const dataList = data.message;
  const oList = document.createElement("ol");
  oList.classList.add(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "gap-4",
    "list-decimal",
    "pl-6"
  ); // Grid layout

  for (const key in dataList) {
    const li = document.createElement("li");
    li.classList.add(
      "text-lg",
      "text-gray-800",
      "font-semibold",
      "bg-gray-100",
      "p-4",
      "rounded-lg",
      "shadow-md"
    );
    li.innerText = key;

    if (dataList[key].length !== 0) {
      const uList = document.createElement("ul");
      uList.classList.add("list-inside", "pl-4"); // Styling for nested list
      for (const item of dataList[key]) {
        const liSub = document.createElement("li");
        liSub.classList.add("text-gray-600", "ml-4");
        liSub.innerText = item;
        uList.appendChild(liSub);
      }
      li.appendChild(uList);
    }
    oList.appendChild(li);
  }
  content.appendChild(oList);
}

randomBtn.addEventListener("click", getRandomDog);
showBreedBtn.addEventListener("click", () =>
  getBreedImages(inputBreed.value.toLowerCase())
);
subBreedBtn.addEventListener("click", () =>
  getSubBreed(inputBreed.value.toLowerCase())
);
showAllBtn.addEventListener("click", () => getAllBreeds());
