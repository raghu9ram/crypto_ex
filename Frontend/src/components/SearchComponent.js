import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios';


export default function SearchComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;


  const onChangeHandle = async value => {
      if(value.length >=3 ) {
        const response = await axios.get(props.url+value);
        setOptions(response.data[props.dataString]);
      }
  };

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous"
      style={{ backgroundColor: "#fff" }}
      open={open}
      multiple={props.multiple}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(ev,value)=> {
          props.onSelection(value);
      }}
      getOptionSelected={(option, value) => option[props.labelKey] === value[props.labelKey]}
      getOptionLabel={option => option[props.labelKey]}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label={props.label}
          variant="filled"
          onChange={(ev) => {
            // dont fire API if the user delete or not entered anything
            if (ev.target.value !== "" || ev.target.value !== null) {
              onChangeHandle(ev.target.value);
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
}
