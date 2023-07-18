interface Champions {
  [key: string]: ChampionsAttribute
}

interface ChampionsAttribute {
  id: string
  name: string
  title: string
  image: string
}

interface RawChampions {
  [key: string]: RawChampionsAttribute
}

interface RawChampionsAttribute {
  id: string
  name: string
  title: string
  image: {
    full: string
  }
}

export { Champions, RawChampions }