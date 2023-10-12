import type { ImageMetadata } from "astro";
type WeatherImages = {
    [key: string]: ImageMetadata;
};

// Desktop Weather Images
import D_113d from "./113d.webp"
import D_113n from "./113n.webp"

import D_116d from "./116d.webp"
import D_116n from "./116n.webp"

import D_119d from "./119d.webp"
import D_119n from "./119n.webp"

import D_122d from "./122d.webp"
import D_122n from "./122n.webp"

import D_143d from "./143d.webp"
import D_143n from "./143n.webp"

import D_176d from "./176d.webp"
import D_176n from "./176n.webp"

import D_179d from "./179d.webp"
import D_179n from "./179n.webp"

import D_182d from "./182d.webp"
import D_182n from "./182n.webp"

import D_185d from "./185d.webp"
import D_185n from "./185n.webp"

import D_200d from "./200d.webp"
import D_200n from "./200n.webp"

import D_230d from "./230d.webp"
import D_230n from "./230n.webp"

import D_227d from "./227d.webp"
import D_227n from "./227n.webp"

import D_296d from "./296d.webp"
import D_296n from "./296n.webp"

import D_305d from "./305d.webp"
import D_305n from "./305n.webp"

import D_350d from "./350d.webp"
import D_350n from "./350n.webp"

import D_389d from "./389d.webp"
import D_389n from "./389n.webp"

import D_392d from "./392d.webp"
import D_392n from "./392n.webp"
import D_Unknown from "./unknown.webp"

export const DesktopImg: WeatherImages = {
    "113d": D_113d,
    "113n": D_113n,
    "116d": D_116d,
    "116n": D_116n,
    "119d": D_119d,
    "119n": D_119n,
    "122d": D_122d,
    "122n": D_122n,
    "143d": D_143d,
    "143n": D_143n,
    "176d": D_176d,
    "176n": D_176n,
    "179d": D_179d,
    "179n": D_179n,
    "182d": D_182d,
    "182n": D_182n,
    "185d": D_185d,
    "185n": D_185n,
    "200d": D_200d,
    "200n": D_200n,
    "230d": D_230d,
    "230n": D_230n,
    "227d": D_227d,
    "227n": D_227n,
    "284d": D_176d,
    "284n": D_176n,
    "296d": D_296d,
    "296n": D_296n,
    "305d": D_305d,
    "305n": D_305n,
    "317d": D_182d,
    "317n": D_182n,
    "335d": D_230d,
    "335n": D_230n,
    "350d": D_350d,
    "350n": D_350n,
    "359d": D_305d,
    "359n": D_305n,
    "365d": D_185d,
    "365n": D_185n,
    "377d": D_350d,
    "377n": D_350n,
    "389d": D_389d,
    "389n": D_389n,
    "392d": D_392d,
    "392n": D_392n,
    "default": D_Unknown,
}