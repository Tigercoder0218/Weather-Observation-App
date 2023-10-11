import type { ImageMetadata } from "astro";
type WeatherImages = {
    [key: string]: ImageMetadata;
};

// Desktop Weather Images
import M_113d from "./113d.webp"
import M_113n from "./113n.webp"
import M_116d from "./116d.webp"
import M_116n from "./116n.webp"
import M_119d from "./119d.webp"
import M_119n from "./119n.webp"
import M_122d from "./122d.webp"
import M_122n from "./122n.webp"
import M_176d from "./176d.webp"
import M_176n from "./176n.webp"
import M_296d from "./296d.webp"
import M_296n from "./296n.webp"
import M_200d from "./200d.webp"
import M_200n from "./200n.webp"
import M_179d from "./179d.webp"
import M_179n from "./179n.webp"
import M_143d from "./143d.webp"
import M_143n from "./143n.webp"
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
    "176d": M_176d,
    "176n": M_176n,
    "296d": M_296d,
    "296n": M_296n,
    "200d": M_200d,
    "200n": M_200n,
    "179d": M_179d,
    "179n": M_179n,
    "143d": M_143d,
    "143n": M_143n,
    "default": M_Unknown,
}