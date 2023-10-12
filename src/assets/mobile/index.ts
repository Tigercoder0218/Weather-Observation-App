import type { ImageMetadata } from "astro";
type WeatherImages = {
    [key: string]: ImageMetadata;
};

// Mobile Weather Images
import M_113d from "./113d.webp"
import M_113n from "./113n.webp"

import M_116d from "./116d.webp"
import M_116n from "./116n.webp"

import M_119d from "./119d.webp"
import M_119n from "./119n.webp"

import M_122d from "./122d.webp"
import M_122n from "./122n.webp"

import M_143d from "./143d.webp"
import M_143n from "./143n.webp"

import M_176d from "./176d.webp"
import M_176n from "./176n.webp"

import M_179d from "./179d.webp"
import M_179n from "./179n.webp"

import M_182d from "./182d.webp"
import M_182n from "./182n.webp"

import M_185d from "./185d.webp"
import M_185n from "./185n.webp"

import M_200d from "./200d.webp"
import M_200n from "./200n.webp"

import M_230d from "./230d.webp"
import M_230n from "./230n.webp"

import M_227d from "./227d.webp"
import M_227n from "./227n.webp"

import M_296d from "./296d.webp"
import M_296n from "./296n.webp"

import M_305d from "./305d.webp"
import M_305n from "./305n.webp"

import M_350d from "./350d.webp"
import M_350n from "./350n.webp"

import M_389d from "./389d.webp"
import M_389n from "./389n.webp"

import M_392d from "./392d.webp"
import M_392n from "./392n.webp"
import M_Unknown from "./unknown.webp"

export const MobileImg: WeatherImages = {
    "113d": M_113d,
    "113n": M_113n,
    "116d": M_116d,
    "116n": M_116n,
    "119d": M_119d,
    "119n": M_119n,
    "122d": M_122d,
    "122n": M_122n,
    "143d": M_143d,
    "143n": M_143n,
    "176d": M_176d,
    "176n": M_176n,
    "179d": M_179d,
    "179n": M_179n,
    "182d": M_182d,
    "182n": M_182n,
    "185d": M_185d,
    "185n": M_185n,
    "200d": M_200d,
    "200n": M_200n,
    "230d": M_230d,
    "230n": M_230n,
    "227d": M_227d,
    "227n": M_227n,
    "284d": M_176d,
    "284n": M_176n,
    "296d": M_296d,
    "296n": M_296n,
    "305d": M_305d,
    "305n": M_305n,
    "317d": M_182d,
    "317n": M_182n,
    "335d": M_230d,
    "335n": M_230n,
    "350d": M_350d,
    "350n": M_350n,
    "359d": M_305d,
    "359n": M_305n,
    "365d": M_185d,
    "365n": M_185n,
    "377d": M_350d,
    "377n": M_350n,
    "389d": M_389d,
    "389n": M_389n,
    "392d": M_392d,
    "392n": M_392n,
    "default": M_Unknown,
}