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
import D_176d from "./176d.webp"
import D_176n from "./176n.webp"
import D_296d from "./296d.webp"
import D_296n from "./296n.webp"
import D_200d from "./200d.webp"
import D_200n from "./200n.webp"
import D_179d from "./179d.webp"
import D_179n from "./179n.webp"
import D_143d from "./143d.webp"
import D_143n from "./143n.webp"
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
    "176d": D_176d,
    "176n": D_176n,
    "296d": D_296d,
    "296n": D_296n,
    "200d": D_200d,
    "200n": D_200n,
    "179d": D_179d,
    "179n": D_179n,
    "143d": D_143d,
    "143n": D_143n,
    "default": D_Unknown,
}