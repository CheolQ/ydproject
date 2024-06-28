export default{
    methods: {
        pageCalc(currentPage, total, pageSize = 10, pageUnit = 10) {
            let firstPage = 1;
            let lastPage =
                Math.floor(total / pageUnit) + (total % pageUnit == 0 ? 0 : 1);
            let startIdx = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
            let endIdx = startIdx + pageSize - 1;
            if (endIdx > lastPage) {
                endIdx = lastPage;
            }
            console.log(firstPage, lastPage, startIdx, endIdx);
            return {currentPage, firstPage, lastPage, startIdx, endIdx };
        },
        $dateFormat (val ){
            let date =	val ==	'' ?	new Date ()	:	new Date (val );
            let year =	date .getFullYear ();
            let month =	('0' +	(date .getMonth ()	+	1 )).slice (-2 );
            let day =	('0' +	date .getDate ()).slice (-2 );
            return `${year }-${month }-${day }`;
        },
        $numberFormat (number) {
            if (number == 0)
            return 0;
            let regex = /(^[+-]?\d+)(\d{3})/;
            let nstr = (number + '');
            while (regex.test(nstr)) {
                nstr = nstr.replace(regex, '$1' + ',' + '$2');
            }
            return nstr;
        }
    }
}

    