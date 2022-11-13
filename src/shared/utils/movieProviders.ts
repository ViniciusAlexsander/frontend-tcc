export interface IMovieProvidersOption {
  provider_name: string;
  provider_id: string;
}

export const findByName = (names: string[]) => {
  return movieProvidersOptions.filter((provider) => {
    return names.find((name) => name === provider.provider_name);
  });
};

const movieProviders = [
  {
    display_priority: 0,
    logo_path: "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg",
    provider_name: "Netflix",
    provider_id: 8,
  },
  {
    display_priority: 1,
    logo_path: "/emthp39XA2YScoYL1p0sdbAH2WA.jpg",
    provider_name: "Amazon Prime Video",
    provider_id: 119,
  },
  // {
  //   display_priority: 1,
  //   logo_path: "/emthp39XA2YScoYL1p0sdbAH2WA.jpg",
  //   provider_name: "Amazon Prime Video",
  //   provider_id: 9,
  // },
  {
    display_priority: 2,
    logo_path: "/peURlLlr8jggOwK53fJ5wdQl05y.jpg",
    provider_name: "Apple iTunes",
    provider_id: 2,
  },
  {
    display_priority: 3,
    logo_path: "/tbEdFQDwx5LEVr8WpSeXQSIirVq.jpg",
    provider_name: "Google Play Movies",
    provider_id: 3,
  },
  {
    display_priority: 6,
    logo_path: "/hR9vWd8hWEVQKD6eOnBneKRFEW3.jpg",
    provider_name: "Star Plus",
    provider_id: 619,
  },
  {
    display_priority: 7,
    logo_path: "/xbhHHa1YgtpwhC8lb1NQ3ACVcLd.jpg",
    provider_name: "Paramount Plus",
    provider_id: 531,
  },
  {
    display_priority: 8,
    logo_path: "/Ajqyt5aNxNGjmF9uOfxArGrdf3X.jpg",
    provider_name: "HBO Max",
    provider_id: 384,
  },
  {
    display_priority: 10,
    logo_path: "/lJT7r1nprk1Z8t1ywiIa8h9d3rc.jpg",
    provider_name: "Claro video",
    provider_id: 167,
  },
  {
    display_priority: 10,
    logo_path: "/5jdN9E9Ftxxbg711crjOyCagTy8.jpg",
    provider_name: "Telecine Play",
    provider_id: 227,
  },
  {
    display_priority: 10,
    logo_path: "/oBoWstXQFHAlPApyxIQ31CIbNQk.jpg",
    provider_name: "Globoplay",
    provider_id: 307,
  },
  {
    display_priority: 11,
    logo_path: "/6uhKBfmtzFqOcLousHwZuzcrScK.jpg",
    provider_name: "Apple TV Plus",
    provider_id: 350,
  },
  {
    display_priority: 11,
    logo_path: "/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg",
    provider_name: "Amazon Video",
    provider_id: 10,
  },
  {
    display_priority: 17,
    logo_path: "/3E0RkIEQrrGYazs63NMsn3XONT6.jpg",
    provider_name: "Paramount+ Amazon Channel",
    provider_id: 582,
  },
  {
    display_priority: 22,
    logo_path: "/bmU37kpSMbcTgwwUrbxByk7x8h3.jpg",
    provider_name: "HBO Go",
    provider_id: 31,
  },
  {
    display_priority: 29,
    logo_path: "/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg",
    provider_name: "Disney Plus",
    provider_id: 337,
  },
  {
    display_priority: 29,
    logo_path: "/cQQYtdaCg7vDo28JPru4v8Ypi8x.jpg",
    provider_name: "NOW",
    provider_id: 484,
  },
];

// exportar em ordem de alfabética
export const movieProvidersOptions = movieProviders.sort((a, b) =>
  a.provider_name.localeCompare(b.provider_name)
);
