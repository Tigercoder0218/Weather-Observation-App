import type { ImageMetadata } from "astro";

type WeatherImages = {
    [key: string]: ImageMetadata;
};

// Weather Icons
import d113 from "./113d.svg";
import n113 from "./113n.svg";

import d116 from "./116d.svg";
import n116 from "./116n.svg";

import d119 from "./119d.svg";
import n119 from "./119n.svg";

import dn122 from "./122dn.svg";

import d143 from "./143d.svg";
import n143 from "./143n.svg";

import d176 from "./176d.svg";
import n176 from "./176n.svg";

import d179 from "./179d.svg";
import n179 from "./179n.svg";

import d182 from "./182d.svg";
import n182 from "./182n.svg";

import d185 from "./185d.svg";
import n185 from "./185n.svg";

import d200 from "./200d.svg";
import n200 from "./200n.svg";

import d227 from "./227d.svg";
import n227 from "./227n.svg";

import d230 from "./230d.svg";
import n230 from "./230n.svg";

import d284 from "./284d.svg";
import n284 from "./284n.svg";

import d296 from "./296d.svg";
import n296 from "./296n.svg";

import d305 from "./305d.svg";
import n305 from "./305n.svg";

import d317 from "./317d.svg";
import n317 from "./317n.svg";

import d335 from "./335d.svg";
import n335 from "./335n.svg";

import d350 from "./350d.svg";
import n350 from "./350n.svg";

import d359 from "./359d.svg";
import n359 from "./359n.svg";

import d365 from "./365d.svg";
import n365 from "./365n.svg";

import d377 from "./377d.svg";
import n377 from "./377n.svg";

import d389 from "./389d.svg";
import n389 from "./389n.svg";

import d392 from "./392d.svg";
import n392 from "./392n.svg";

import Unknown from "./unknown.svg";

export const WeatherIcons: WeatherImages = {
    "113d": d113,
    "113n": n113,
    "116d": d116,
    "116n": n116,
    "119d": d119,
    "119n": n119,
    "122d": dn122,
    "122n": dn122,
    "143d": d143,
    "143n": n143,
    "176d": d176,
    "176n": n176,
    "179d": d179,
    "179n": n179,
    "182d": d182,
    "182n": n182,
    "185d": d185,
    "185n": n185,
    "200d": d200,
    "200n": n200,
    "227d": d227,
    "227n": n227,
    "230d": d230,
    "230n": n230,
    "284d": d284,
    "284n": n284,
    "296d": d296,
    "296n": n296,
    "305d": d305,
    "305n": n305,
    "317d": d317,
    "317n": n317,
    "335d": d335,
    "335n": n335,
    "350d": d350,
    "350n": n350,
    "359d": d359,
    "359n": n359,
    "365d": d365,
    "365n": n365,
    "377d": d377,
    "377n": n377,
    "389d": d389,
    "389n": n389,
    "392d": d392,
    "392n": n392,
    "default": Unknown,
};
