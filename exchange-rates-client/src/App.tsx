import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App () {
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'currency', direction: 'asc' });

    useEffect(() => {
        console.log('aaa');
        // לשלוף את רשימת המטבעות
        axios.get('https://localhost:7009/api/Currency/currencies')
            .then(response => {
                console.log(response.data);
                setCurrencies(response.data);
                console.log(currencies);
            })
            .catch(error => console.error('Error fetching currencies:', error));
    }, []);

    useEffect(() => {
        if (selectedCurrency) {
            // לשלוף את שערי החליפין למטבע שנבחר
            axios.get(`https://localhost:7009/api/Currency/exchange-rates/${selectedCurrency}`)
                .then(response => {
                    setExchangeRates(response.data);
                })
                .catch(error => console.error('Error fetching exchange rates:', error));
        }
    }, [selectedCurrency]);

    const sortedExchangeRates = () => {
        if (!exchangeRates) return [];

        const sortedData = [...Object.entries(exchangeRates)];

        sortedData.sort((a, b) => {
            const [currencyA, rateA] = a;
            const [currencyB, rateB] = b;
            const isNumberA = typeof rateA === 'number';
            const isNumberB = typeof rateB === 'number';

            // אם רוצים למיין לפי שער המרה
            if (sortConfig.key === 'rate') {
                if (isNumberA && isNumberB) {
                    return sortConfig.direction === 'asc' ? rateA - rateB : rateB - rateA;
                }
                return 0;
            }

            // אם רוצים למיין לפי מטבע
            if (sortConfig.key === 'currency') {
                return sortConfig.direction === 'asc'
                    ? currencyA.localeCompare(currencyB)
                    : currencyB.localeCompare(currencyA);
            }

            return 0;
        });

        return sortedData;
    };

    const handleSort = (key: 'currency' | 'rate') => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <h1>Exchange Rates</h1>
            <select onChange={e => setSelectedCurrency(e.target.value)} value={selectedCurrency}>
                {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                ))}
            </select>
            {exchangeRates && (
                <table>
                    <thead>
                        <tr>
                            <th>Base Currency</th>
                            <th onClick={() => handleSort('currency')}>Currency {sortConfig.key === 'currency' ? (sortConfig.direction === 'asc' ? '⮝' : '⮟') : ''}</th>
                            <th onClick={() => handleSort('rate')}>Exchange Rate {sortConfig.key === 'rate' ? (sortConfig.direction === 'asc' ? '⮝' : '⮟') : ''}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedExchangeRates().map(([currency, rate]) => (
                            <tr key={currency}>
                                <td>{selectedCurrency}</td>
                                <td>{currency}</td>
                                <td>{typeof rate === 'number' ? rate : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default App;




// import { useEffect, useState } from 'react'
// import './App.css'
// import axios from 'axios';

// function App () {
//     const [currencies, setCurrencies] = useState([]);
//     const [selectedCurrency, setSelectedCurrency] = useState('USD');
//     const [exchangeRates, setExchangeRates] = useState(null);

//     useEffect(() => {
//         console.log('aaa');
//         // לשלוף את רשימת המטבעות
//         axios.get('https://localhost:7009/api/Currency/currencies')
//             .then(response => {
//                 console.log(response.data);
//                 setCurrencies(response.data);
//                 console.log(currencies);
//             })
//             .catch(error => console.error('Error fetching currencies:', error));
//     }, []);

//     useEffect(() => {
//         if (selectedCurrency) {
//             // לשלוף את שערי החליפין למטבע שנבחר
//             axios.get(`https://localhost:7009/api/Currency/exchange-rates/${selectedCurrency}`)
//                 .then(response => {
//                     setExchangeRates(response.data);
//                 })
//                 .catch(error => console.error('Error fetching exchange rates:', error));
//         }
//     }, [selectedCurrency]);

//     return (
//         <div>
//             <h1>Exchange Rates</h1>
//             <select onChange={e => setSelectedCurrency(e.target.value)} value={selectedCurrency}>
//                 {currencies.map(currency => (
//                     <option key={currency} value={currency}>{currency}</option>
//                 ))}
//             </select>
//             {exchangeRates && (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Base Currency</th>
//                             <th>Currency</th>
//                             <th>Exchange Rate</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                     {exchangeRates && Object.entries(exchangeRates).map(([currency, rate]) => (
//                         <tr key={currency}>
//                             <td>{selectedCurrency}</td>
//                             <td>{currency}</td>
//                             <td>{typeof rate === 'number' ? rate : 'N/A'}</td>
//                         </tr>
//                     ))}

//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default App;
