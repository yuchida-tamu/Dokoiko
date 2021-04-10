import React, { useState, useEffect } from 'react';

import MiniNav from '../../components/MiniNav/MiniNav';
import photo from '../../testData/photos/test.jpg';
import ItemCard from '../../components/ItemCard/ItemCard';
import Modal from '../../components/Modal/Modal';
import { useCurrentUserContext } from '../../contexts/CurrentUserContext';
import { compareByDate } from '../../helpers/helper';

const EventDashboard = () => {
  const { events, setEvents, user, setUser } = useCurrentUserContext();
  //const [events, setEvents] = useState(initialEvents);
  const [eventSelected, setEventSelected] = useState();
  const [isShowModal, setIsShowModal] = useState();

  const onClickToShowModalHandler = () => {
    const toggle = !isShowModal;
    setIsShowModal(toggle);
  };

  const onClickFavoriteHandler = () => {
    //check if the id already exists in the user's favorite list
    if (user.favorite_events.includes(eventSelected.id)) {
      const removed = user.favorite_events.filter(p => p != eventSelected.id);
      setUser({
        ...user,
        favorite_events: removed,
      });

      return;
    }
    let updatedArr = [...user.favorite_events];
    updatedArr.push(eventSelected.id);
    setUser({
      ...user,
      favorite_events: updatedArr,
    });
  };

  const onSubmitNewPlanHandler = event => {
    event.preventDefault();

    const planName = event.target[0].value;
    const date = event.target[1].value;
    if (!planName) {
      window.alert('You need to enter Plan Name');
      return;
    }
    //prepare data object to send to the api
    const newPlan = {
      user_id: user.id,
      name: planName,
      date: date,
      list: [eventSelected.id],
      isPlace: true,
    };

    //send data to the api and save it to db
    // axios
    //   .post('/api/v1/eventlist', newPlan)
    //   .then(response => {
    //     //response should have the data saved, store that data
    //     const eventList = response.data.list;
    //     //user.plans only stores refrences(ids)
    //     const updatedLists = [...user.plans, eventList];
    //     setUser({
    //       ...user,
    //       plans: updatedLists,
    //     });
    //   })
    //   .catch(err => console.log('failed to post new eventlist'));

    const updatedArr = [...user.plans, { ...newPlan }];
    updatedArr.sort(compareByDate);

    //Temp for local test
    setUser({
      ...user,
      plans: updatedArr,
    });
  };

  const onAddToExisitingPlanHandler = plan => {
    //chech if the place is already added to the plan
    if (plan.list.filter(evt => evt === eventSelected.id).length > 0)
      return console.log('this place is already added to the plan');

    //if not, add it to the plan and update the context

    const updateEvents = [...plan.list, eventSelected.id];
    const updatePlan = { ...plan, list: updateEvents, isPlace: true };
    const filtered = user.plans.filter(plan => plan.name !== updatePlan.name);
    const update = [...filtered, updatePlan];
    update.sort(compareByDate);
    setUser({
      ...user,
      plans: update,
    });
  };

  const renderPlans = user.plans.map(plan => (
    <li
      key={plan.id}
      onClick={() => {
        onAddToExisitingPlanHandler(plan);
      }}
      className='plan-item valign-wrapper'
    >
      <span className='plan-item__name'>{plan.name}</span>
      <span className='plan-item__date'>{plan.date}</span>
      <span className='badge plan-item__count'>{plan.list.length}</span>
    </li>
  ));

  const renderEventDetail = eventSelected ? (
    <div>
      <img src={photo} />
      <h4>{eventSelected.name}</h4>
      <div id='event-detail__content'>
        <div>
          <p>{eventSelected.description}</p>
          <span>Start: {eventSelected.startDate}</span>
          <br />
          <span>End: {eventSelected.endDate}</span>
          <br />
        </div>
        <div id='event-detail_content__actions' className='center-align'>
          <a
            className='btn-floating btn-medium waves-effect waves-light cyan darken-1'
            onClick={onClickToShowModalHandler}
          >
            <i className='material-icons'>location_on</i>
          </a>
          <a
            className='btn-floating btn-medium waves-effect waves-light cyan darken-1'
            style={{ margin: '0 15px' }}
            onClick={onClickFavoriteHandler}
          >
            <i className='material-icons'>
              {user.favorite_events.includes(eventSelected.id)
                ? 'favorite'
                : 'favorite_border'}
            </i>
          </a>
          <a className='btn-floating btn-medium waves-effect waves-light cyan darken-1'>
            <i className='material-icons'>info_outline</i>
          </a>
        </div>
      </div>
    </div>
  ) : null;

  const eventClickHandler = eventClicked => {
    setEventSelected(eventClicked);
  };

  const renderEvents = events.map(event => (
    <ItemCard item={event} click={eventClickHandler} photo={photo} />
  ));

  return (
    <div>
      <div className='SideControl container col l3 indigo darken-2'>
        <MiniNav />
        <div className='event-detail col l10 indigo lighten-4'>
          {renderEventDetail}
        </div>
      </div>
      <div id='event-dashboard' className='col l9 dashboard'>
        {isShowModal ? (
          <Modal submit={onSubmitNewPlanHandler} plans={renderPlans} />
        ) : null}
        <ul className='row'>{renderEvents}</ul>
      </div>
    </div>
  );
};

export default EventDashboard;
