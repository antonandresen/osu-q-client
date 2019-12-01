import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../store/actions";

const Home = props => {
  useEffect(() => {
    async function getData() {
      await props.getLeaderboard();
    }
    getData();
  }, []);

  return (
    <div>
      {props.leaderboard.length === 0 ? (
        <h2>Welcome!</h2>
      ) : (
        <div className="row">
          <div className="panel panel-primary filterable">
            <div className="panel-heading">
              <h3 className="panel-title">Leaderboard</h3>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="#"
                      disabled
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      disabled
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Rating"
                      disabled
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Wins"
                      disabled
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.leaderboard.reverse().map((player, ix) => {
                  {
                    console.log("player", player);
                  }
                  return (
                    <tr key={ix}>
                      <td>{ix + 1}</td>
                      <td>{player.username}</td>
                      <td>{player.rating}</td>
                      <td>{player.wins}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  leaderboard: state.leaderboard.leaderboard
});

export default connect(mapStateToProps, actions)(Home);
