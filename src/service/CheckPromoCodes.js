export default function CheckCodes(serverAllCodes, usersActivatedCodes){
    let resultActualCodes = sortOldCodes(serverAllCodes.slice(0), serverAllCodes); // сортировка от просроченных кодов
    resultActualCodes.a = sortActivatedCodes(usersActivatedCodes, resultActualCodes.a); // сортировка активированых промокодов
    return { actualCodes: resultActualCodes.a, history: resultActualCodes.b };
}

function sortActivatedCodes(a, b){
    //сортировка активированых кодов
    a.forEach((value) => {
        b = b.filter((item) => item._id !== value._id);
    });
    return b;
}

function sortOldCodes(a, b){
    //сортировка от истёкших кодов
    const tempHistory = [];

    b.forEach((value) => {
        if(Date.now() > value.expired){
            tempHistory.push(value);
            a = a.filter((item) => item._id !== value._id);
        }
    });

    return { a: a, b: tempHistory };
}