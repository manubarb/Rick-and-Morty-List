function mapStatus(characterStatus) {
    switch (characterStatus) {
      case "Alive":
        return {
          color: "success",
          text: "Vivo",
        };
      case "Dead":
        return {
          color: "danger",
          text: "Morto",
        };
      default:
        return {
          color: "secondary",
          text: "Desconhecida",
        };
    }
  }
  
  function mapSpecie(characterSpecie) {
    switch (characterSpecie) {
      case "Human":
        return "Humano";
      case "Alien":
        return "Alien";
      case "Robot":
        return "Robô";
      default:
        return `Outro (${characterSpecie})`;
    }
  }
  
  async function renderFooterData() {
    const totalCharacters = await getTotalByFeature("character");
    const totalLocations = await getTotalByFeature("location");
    const totalEpisodes = await getTotalByFeature("episode");
  
    const spanTotalCharacters = document.getElementById("personagem");
    spanTotalCharacters.innerText = totalCharacters;
  
    const spanTotalLocations = document.getElementById("localizacao");
    spanTotalLocations.innerText = totalLocations;
  
    const spanTotalEpisodes = document.getElementById("episodios");
    spanTotalEpisodes.innerText = totalEpisodes;
  
    const spanCurrentYear = document.getElementById("current-year");
    spanCurrentYear.innerText = new Date().getFullYear();
  }