export function calc_passed_time(timestamp_to_get_since: number): String {
    let now = Date.now()
    let old: any = new Date(timestamp_to_get_since * 1000)
    let diffMs = now - old
    let diffDays = Math.floor(diffMs / 86400000) // days
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000) // hours
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000) // minutes
    return diffDays + ' d, ' + diffHrs + ' h, ' + diffMins + ' min'
}
