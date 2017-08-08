// Funktion setObject um Objekte im localStorage zu speichern
Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
}

// Funktion getObject um Objekte aus dem localStorage zu laden
Storage.prototype.getObject = function(key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
}

const formatDate = (date) => {
  var monthNames = [
    "Januar", "Februar", "März",
    "April", "Mai", "Juni", "Juli",
    "August", "September", "Oktober",
    "November", "Dezember"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

const databaseMock = () => {
  // localStorage mit Kursen füllen, falls keine Vorhanden
  const tmp =
    { deu:
      { name:"Deutsch"
      , noten:[ {wert:80, datum:'2017-1-21'}, {wert:90, datum:'2017-1-22'} ]
      }
    , eng:
      { name:"Englisch"
      , noten:[ {wert:67, datum:'2017-1-20'}, {wert:100, datum:'2017-1-23'} ]
      }
    , dif:
      { name:"Differenzierungskurs"
      , noten:[]
      }
    , mat:
      { name:"Mathe"
      , noten:[ {wert:99, datum:'2017-1-21'}, {wert:87, datum:'2017-1-24'}, {wert:95, datum:'2017-1-29'} ]
      }
    };

  if (!localStorage.getObject("data")) {
    localStorage.setObject("data", tmp);
  }

  console.dir(localStorage.getObject("data"));

  return tmp;
}

// ########## TESTZWECKE ##########
databaseMock();

class InfoZuKurs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wertKorrekt: false, datumKorrekt:false, wert: '', datum: '', buttonState: "disabled" };
    this.handleWertChange = this.handleWertChange.bind(this);
    this.handleDatumChange = this.handleDatumChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  checkEingaben() {
    if (this.state.datumKorrekt && this.state.wertKorrekt) {
      this.state.buttonState = '';
    } else {
      this.state.buttonState = 'disabled';
    }
    this.forceUpdate();

  }
  handleWertChange(event) {
    if ( event.target.value > -1 && event.target.value < 101 ) {
      this.state.wertKorrekt = true;
      this.state.wert = event.target.value;
    } else {
      this.state.wert = event.target.value;
      this.state.wertKorrekt = false;
    }
    this.checkEingaben();

  }
  handleDatumChange(event) {
    if ( !isNaN(Date.parse(event.target.value)) ) {
      this.state.datum = event.target.value;
      this.state.datumKorrekt = true;
    } else {
      this.state.datumKorrekt = false;
    }
    this.checkEingaben();

  }
  handleSubmit(event) {
    this.props.saveMark(this.props.id, this.state.wert, this.state.datum);
    this.setState({ wertKorrekt: false, datumKorrekt:false, wert: '', datum: '', buttonState: "disabled" });
    event.preventDefault();
  }
  render() {
    let buttonState = this.state.buttonState;
    let alleNoten = [];
    for (let key in this.props.noten) {
      alleNoten.push(<li key={ key }>
        { this.props.noten[key].wert }% ({formatDate(new Date(this.props.noten[key].datum))})
      </li>);
    }
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type="number" value={ this.state.wert } min="0" max="100" onChange={ this.handleWertChange } placeholder="Note in % (0 - 100)"/>
          <input type="date" value={ this.state.datum } onChange={ this.handleDatumChange } placeholder="Datum"/>
          <input type="submit" value="speichern" disabled={ buttonState }/>
        </form>
        <ul className="table-view">
          { alleNoten }
        </ul>
      </div>
    )
  }
}

class Kurs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showInfo: false };
  }
  navigateRightHandler() {
      this.state.showInfo ? this.setState({ showInfo: false }) : this.setState({ showInfo: true });
  }
  render() {
    const { kurs, noten } = this.props;
    let note = 0;
    if (noten.length > 0) {
        const summe = noten.reduce((a, b) => { return parseInt(a)+parseInt(b.wert)},note);
        note = Math.round(summe/noten.length);
    }
    return (
      <li key={kurs} className="table-view-cell">
        <a className="navigate-right" onClick={ ()=>(this.navigateRightHandler()) }>
          { kurs }
          <span className="badge">
            { note }%
          </span>
        </a>
          { this.state.showInfo ? <InfoZuKurs key={ this.props.kurs } id={ this.props.id } kurs = { this.props.kurs } noten={ noten } saveMark={ this.props.saveMark }/> : <null/>}
          {/*<InfoZuKurs noten={noten}/>*/}
      </li>
    )
  }
}

class Kursliste extends React.Component {
  render() {
	let data = this.props.data;
	const liste = [];
	for ( let key in data ) {
	  liste.push(<Kurs key={ key } id={ key } kurs={ data[key].name } noten={ data[key].noten } saveMark={ this.props.saveMark }/>);
	}
    return (
      <ul className="table-view">
        { liste }
      </ul>
    )
  }
}

/*class Suchfeld extends React.Component {
  render() {
    return (
      <div>
        <input type="text"/>
      </div>
    )
  }
}*/

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: localStorage.getObject("data") };
    this.saveMark = this.saveMark.bind(this);
  }
  saveMark(key,wert,datum) {
    let dataCopy = this.state.data;
    dataCopy[key].noten.push({ wert:wert, datum:datum });
    this.setState( {data: dataCopy} );
    localStorage.setObject("data", dataCopy);
  }
  handleSync() {
    console.log("lade Daten von Datenbank");
    let data = databaseMock();
    localStorage.setObject("data", data);
    this.setState({ data: data });
  }
  render() {
    return (
      <div>
        <nav className="bar bar-nav">
          <h1 className="title">Notenverwaltung</h1>
          <button className="btn pull-right" onClick={ () => ( this.handleSync() ) }>
            sync
          </button>
          {/*<a className="icon icon-sync pull-right"></a>*/}
        </nav>
        <div className="content">
          <Kursliste saveMark={ this.saveMark.bind(this) } data={ this.state.data }/>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

var destination = document.getElementById("container");

ReactDOM.render(
  <ReactRouter.Router history={ReactRouter.hashHistory}>
    <ReactRouter.Route path="/" component={App}>
      <ReactRouter.IndexRoute component={Home}/>
      {/*<ReactRouter.Route path="details" compomemt={}/>*/}
    </ReactRouter.Route>
  </ReactRouter.Router>, destination
);