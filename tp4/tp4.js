import countries from "./data/fifa-ranking.json" assert { type: "json" };

const regions = [
  {
    name: "Africa",
    fifa_name: "CAF",
    selected_teams: 9,
  },
  {
    name: "Europe",
    fifa_name: "UEFA",
    selected_teams: 16,
  },
  {
    name: "Middle and North America",
    fifa_name: "CONCACAF",
    selected_teams: 6,
  },
  {
    name: "South America",
    fifa_name: "CONMEBOL",
    selected_teams: 6,
  },
  {
    name: "Asia",
    fifa_name: "AFC",
    selected_teams: 8,
  },
  {
    name: "Oceania",
    fifa_name: "OFC",
    selected_teams: 1,
  },
];

const HOST_REGION = "CONCACAF";
const HOST_COUNTRIES = ["Canada", "Mexico", "USA"];

const getRegionCountries = (regionName, countries) =>
  countries.filter((country) => country.continent === regionName);

const getSortedRegionsCountries = (regionCountries) =>
  regionCountries.sort((a, b) =>
    a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0
  );

function getHostSelectedCountries(sortedRegionCountries, selectedAmount) {
  let selectedRegionTeams = sortedRegionCountries.filter((country) =>
    HOST_COUNTRIES.includes(country.teamName)
  );

  sortedRegionCountries = sortedRegionCountries.filter(
    (country) => !HOST_COUNTRIES.includes(country.teamName)
  );

  selectedRegionTeams.concat(
    getRegionSelectedCountries(
      sortedRegionCountries,
      selectedAmount - HOST_COUNTRIES.length
    )
  );

  return selectedRegionTeams;
}

function getBarrageTeam(region, selectedTeams, sortedRegionCountries) {
  if (region.fifa_name === "UEFA") {
    return;
  }

  let barrageTeam = undefined;

  while (barrageTeam === undefined) {
    let potentialBarrageTeam =
      sortedRegionCountries[
        Math.floor(Math.random() * sortedRegionCountries.length)
      ];

    if (
      selectedTeams.some(
        (team) => team.teamName === potentialBarrageTeam.teamName
      )
    ) {
      continue;
    }

    barrageTeam = potentialBarrageTeam;
  }

  return barrageTeam;
}

const getRegionSelectedCountries = (sortedRegionCountries, selectedAmount) =>
  sortedRegionCountries.slice(0, selectedAmount);

function add2Among6BarrageTeam(region, selectedTeams, sortedRegionCountries) {
  let barrageTeams = [];

  barrageTeams.push(
    getBarrageTeam(region, selectedTeams, sortedRegionCountries)
  );

  if (region.fifa_name === HOST_REGION) {
    barrageTeams.push(
      getBarrageTeam(region, selectedTeams, sortedRegionCountries)
    );
  }

  const shuffledList = barrageTeams.sort(() => Math.random() - 0.5);
  selectedTeams.push(shuffledList.slice(0, 2));
}

function getSelectedTeams(regions, countries) {
  let selectedTeams = [];

  regions.forEach((region) => {
    let regionCountries = getRegionCountries(region.name, countries);

    let sortedRegionCountries = getSortedRegionsCountries(regionCountries);

    let selectedRegionCountries =
      region.fifa_name === HOST_REGION
        ? getHostSelectedCountries(sortedRegionCountries, region.selected_teams)
        : getRegionSelectedCountries(
            sortedRegionCountries,
            region.selected_teams
          );

    selectedTeams = selectedTeams.concat(selectedRegionCountries);

    console.log(
      region.name,
      region.selected_teams,
      selectedTeams.length,
      selectedRegionCountries.length
    );

    add2Among6BarrageTeam(region, selectedTeams, sortedRegionCountries);
  });

  return selectedTeams;
}

function getGroups(selectedTeams) {
  let shuffledTeams = selectedTeams.sort(() => Math.random() - 0.5);

  let groups = [];

  while (shuffledTeams.length >= 4) {
    groups.push(shuffledTeams.splice(0, 4));
  }

  return groups;
}

const selectedTeams = getSelectedTeams(regions, countries);
const groups = getGroups(selectedTeams);
console.log(groups);
