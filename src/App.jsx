import { useEffect, useState } from 'react';
import { getAllTickets } from './services/ticketService';
import './App.css';

export const App = () => {
  const [allTickets, setAllTickets] = useState([]);
  const [showEmergency, setShowEmergency] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    getAllTickets().then((ticketsArray) => {
      setAllTickets(ticketsArray);
      console.log('tickets set!');
    });
  }, []);

  useEffect(() => {
    if (showEmergency) {
      const emergencyTickets = allTickets.filter(
        (ticket) => ticket.emergency === true);
      setFilteredTickets(emergencyTickets);
    } else {
        setFilteredTickets(allTickets);
    }
  }, [showEmergency, allTickets])

  return (
    <div className='tickets-container'>
      <h2>Tickets</h2>
      <div>
        <button
          className='filter-btn btn-warning'
          onClick={() => setShowEmergency(true)}
        >Emergency</button>
        <button
          className='filter-btn btn-info'
          onClick={() => setShowEmergency(false)}
        >Show All</button>
      </div>
      <article className='tickets'>
        {filteredTickets.map((ticket) => {
          return (
            <section className='ticket' key={ticket.id}>
              <header className='ticket-info'>{ticket.id}</header>
              <div>{ticket.description}</div>
              <footer>
                <div className='ticket-info'>Emergency:</div>
                <div>{ticket.emergency ? 'Yes' : 'No'}</div>
              </footer>
            </section>
          );
        })}
      </article>
    </div>
  );
};
