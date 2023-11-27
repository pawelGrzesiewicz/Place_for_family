import React from "react";
import {Button, Slider, TextField} from "@mui/material";
import {IoSearchOutline} from "react-icons/io5";
import {GrPowerReset} from "react-icons/gr";


export default function SearchEngine_Headline() {

    return (
        <section className='search'>
            <h2>entertainment finder</h2>

            <TextField style={{width: '100%'}}
                       id="outlined-basic"
                       label="Search for a ..."
                       variant="outlined"
            />

            <div className='distance'>
                <p className='distance__dsc'>Distance:</p>
                <Slider
                    className='distance__slider'
                    size="small"
                    defaultValue={70}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                />
            </div>

            <div className='search__btn'>
                <Button variant="outlined"
                        style={{width: '50%'}}>
                    <GrPowerReset style={{ marginRight: '5%' }} />
                    RESET
                </Button>
                <Button variant="outlined"
                        style={{ width: '50%'}}>

                    <IoSearchOutline style={{ marginRight: '5%' }} />
                    SEARCH
                </Button>
            </div>
        </section>
    )
}