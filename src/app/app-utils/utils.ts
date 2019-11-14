/** Miscellaneous utils used through all the app. */

export function todayWithoutTime(): Date {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
}

export function yesterdayWithoutTime(): Date {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
}

export function tomorrowWithoutTime(): Date {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
}
