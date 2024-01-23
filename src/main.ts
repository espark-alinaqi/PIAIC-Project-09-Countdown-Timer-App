import inquirer from 'inquirer';

let sleep = () => new Promise((r) => setTimeout(r, 2000))

async function SetDateAndTime(name: string, regex: RegExp) {
    let isDate = name === 'Date' ? true : false
    let date_time: string;
    while (true) {

        const input = await inquirer.prompt([{
            name: 'date_and_time',
            message: `Enter ${name} : `,
            default: isDate ? '1/25/2024' : '12:00 AM',
        }])
        date_time = await input['date_and_time']
        if (regex.test(date_time)) {
            break
        }
        else {
            console.log(`Enter Correct Pattern Of ${name}`)
        }
    }
    return date_time
}

function StartTimer(complete_date: string) {
    console.log(` Days | Hours | Minutes | Seconds `)
    const timer = setInterval(() => {
        let newDate = (new Date() as unknown) as number
        let myDate = (new Date(complete_date) as unknown) as number
        let time_milli_seconds = myDate - newDate
        if (time_milli_seconds < 0) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            console.log('Expired')
            console.log(`=======================================================\n`)
            clearInterval(timer)
            return
        }

        let sec_con = 1000 // Milliseconds in a Second
        let min_con = sec_con * 60 // Milliseconds in a Minute
        let hour_con = min_con * 60 // Milliseconds in an Hour
        let days_con = hour_con * 24 // Milliseconds in a Day

        let days = Math.floor(time_milli_seconds / days_con)
        let hours = Math.floor((time_milli_seconds % days_con) / hour_con)
        let mins = Math.floor((time_milli_seconds % hour_con) / min_con)
        let secs = Math.floor((time_milli_seconds % min_con) / sec_con)
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`  ${days > 9 ? String(days) : `0${String(days)}`}  :   ${hours > 9 ? String(hours) : `0${String(hours)}`}  :   ${mins > 9 ? String(mins) : `0${String(mins)}`}    :   ${secs > 9 ? String(secs) : `0${String(secs)}`}`);


    }, 1000);

}

console.log(`                 `)
console.log(`  Instructions:  `)
console.log(`--------------------------------------------------------------------------`)
console.log(`${'=>'} Date Format: MM/DD/YYYY [Year Limit 2023-2025]  Example: 1/25/2024.`)
console.log(`--------------------------------------------------------------------------`)
console.log(`${'=>'} Time Format: Hours[0-12]:Minutes[0-59] PM/AM  Example: 11:30 AM.`)
console.log(`--------------------------------------------------------------------------`)
console.log(`${'=>'} Timer Will Be Expired If Time Is Ended.`)
console.log(`--------------------------------------------------------------------------`)
console.log(`${'=>'} Press Ctrl + C To Stop Timer.`)
console.log(`--------------------------------------------------------------------------\n`)

let dateRegex = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/](202[3-5])$/
let timeRegx = /^(0?[0-9]|[1][012]):(0?[0-9]|[1-5][0-9]) ((a|p)m|(A|P)M)$/
let date = await SetDateAndTime("Date", dateRegex)
let time = await SetDateAndTime("Time", timeRegx)
let complete_date = `${date} ${time}`
console.log(`Starting Timer`)
await sleep()
console.log(`Timer Started Successfully\n`)
console.log(`=======================================================`)
StartTimer(complete_date)
