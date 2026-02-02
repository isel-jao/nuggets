const tabs = [
  { name: "Home", isActive: true },
  { name: "About", isActive: false },
  { name: "Contact", isActive: false },
];

const navElement = document.createElement("nav");
navElement.className = "tabs";

function createIndicator() {
  const indicator = document.createElement("div");
  indicator.className = "active-indicator";
  return indicator;
}

function setActiveTab(tabElement) {
  document.querySelectorAll(".active-indicator").forEach((el) => el.remove());
  tabElement.appendChild(createIndicator());
}

tabs.forEach((tab) => {
  const tabElement = document.createElement("div");
  tabElement.className = "tab";

  const label = document.createElement("span");
  label.className = "tab-label";
  label.textContent = tab.name;

  tabElement.appendChild(label);

  if (tab.isActive) {
    tabElement.appendChild(createIndicator());
  }

  tabElement.addEventListener("click", () => {
    if (!document.startViewTransition) {
      setActiveTab(tabElement);
      return;
    }

    document.startViewTransition(() => {
      setActiveTab(tabElement);
    });
  });

  navElement.appendChild(tabElement);
});

document.querySelector("main").appendChild(navElement);
