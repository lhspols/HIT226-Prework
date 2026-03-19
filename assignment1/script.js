const workouts = [
  {
    id: 1,
    title: "Full Body HIIT",
    type: "HIIT",
    difficulty: "Intermediate",
    duration: 30,
    muscles: ["Full Body", "Core"],
    color: "#333"
  },
  {
    id: 2,
    title: "Beginner Yoga",
    type: "Yoga",
    difficulty: "Beginner",
    duration: 20,
    muscles: ["Full Body", "Hips", "Spine"],
    color: "#333"
  },
  {
    id: 3,
    title: "Upper Body",
    type: "Strength",
    difficulty: "Intermediate",
    duration: 45,
    muscles: ["Chest", "Back", "Shoulders", "Arms"],
    color: "#333"
  },
  {
    id: 4,
    title: "5K",
    type: "Cardio",
    difficulty: "Beginner",
    duration: 35,
    muscles: ["Legs", "Glutes"],
    color: "#333"
  },
  {
    id: 5,
    title: "Advanced Powerlifting",
    type: "Strength",
    difficulty: "Advanced",
    duration: 60,
    muscles: ["Legs", "Back", "Chest", "Core"],
    color: "#333"
  },
  {
    id: 6,
    title: "Hip and Back",
    type: "Mobility",
    difficulty: "Beginner",
    duration: 15,
    muscles: ["Hips", "Lower Back", "Glutes"],
    color: "#333"
  },
  {
    id: 7,
    title: "Advanced Cardio",
    type: "HIIT",
    difficulty: "Advanced",
    duration: 25,
    muscles: ["Full Body", "Core", "Legs"],
    color: "#333"
  },
  {
    id: 8,
    title: "Leg Day",
    type: "Strength",
    difficulty: "Beginner",
    duration: 40,
    muscles: ["Quads", "Hamstrings", "Glutes", "Calves"],
    color: "#333"
  },
  {
    id: 9,
    title: "Cycling",
    type: "Cardio",
    difficulty: "Intermediate",
    duration: 50,
    muscles: ["Legs", "Cardiovascular"],
    color: "#333"
  },
  {
    id: 10,
    title: "Intermediate Yoga",
    type: "Yoga",
    difficulty: "Intermediate",
    duration: 45,
    muscles: ["Full Body", "Core", "Arms"],
    color: "#333"
  },
  {
    id: 11,
    title: "Core",
    type: "HIIT",
    difficulty: "Intermediate",
    duration: 20,
    muscles: ["Core", "Abs", "Lower Back"],
    color: "#333"
  },
  {
    id: 12,
    title: "Full Body",
    type: "Mobility",
    difficulty: "Intermediate",
    duration: 30,
    muscles: ["Full Body", "Joints", "Spine"],
    color: "#333"
  }
];

let activeFilters = {
  type: "all",
  difficulty: "all"
};

let searchQuery = "";

function getDifficultyClass(difficulty) {
  if (difficulty === "Beginner") return "tag-beginner";
  if (difficulty === "Intermediate") return "tag-intermediate";
  if (difficulty === "Advanced") return "tag-advanced";
  return "";
}

function render() {
  const grid = document.getElementById("workoutGrid");
  const countEl = document.getElementById("resultCount");

  const filtered = workouts.filter(function(w) {
    const matchType = activeFilters.type === "all" || w.type === activeFilters.type;
    const matchDiff = activeFilters.difficulty === "all" || w.difficulty === activeFilters.difficulty;
    const matchSearch = w.title.toLowerCase().includes(searchQuery) ||
                        w.type.toLowerCase().includes(searchQuery) ||
                        w.muscles.some(function(m) { return m.toLowerCase().includes(searchQuery); });
    return matchType && matchDiff && matchSearch;
  });

  countEl.textContent = filtered.length;

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty"><p>No workouts found. Change filters?.</p></div>';
    return;
  }

  grid.innerHTML = filtered.map(function(w) {
    return '<div class="card">' +
      '<div class="card-top" style="background:' + w.color + '"></div>' +
      '<div class="card-body">' +
        '<div class="card-tags">' +
          '<span class="tag tag-type">' + w.type + '</span>' +
          '<span class="tag ' + getDifficultyClass(w.difficulty) + '">' + w.difficulty + '</span>' +
        '</div>' +
        '<h3>' + w.title + '</h3>' +
        '<div class="muscles">' +
          w.muscles.map(function(m) { return '<span class="muscle">' + m + '</span>'; }).join('') +
        '</div>' +
      '</div>' +
      '<div class="card-footer">' +
        '<div class="card-meta">' +
          '<span>' + w.duration + ' min</span>' +
        '</div>' +
        '<button class="btn-view">View</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

document.querySelectorAll(".filter-btn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    var filterType = btn.dataset.filter;
    var value = btn.dataset.value;

    activeFilters[filterType] = value;

    document.querySelectorAll('.filter-btn[data-filter="' + filterType + '"]').forEach(function(b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");

    render();
  });
});

document.getElementById("searchInput").addEventListener("input", function(e) {
  searchQuery = e.target.value.toLowerCase().trim();
  render();
});

render();
