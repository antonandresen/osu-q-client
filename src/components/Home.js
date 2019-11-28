import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../store/actions";

const Home = props => {
  useEffect(() => {
    async function getData() {
      await props.getLeaderboard();
      console.log("leaderboard", props.leaderboard);
    }
    getData();
  }, []);

  return (
    <div>
      {props.leaderboard.length === 0 ? (
        <h2>Welcome!</h2>
      ) : (
        <div class="row">
          <div class="panel panel-primary filterable">
            <div class="panel-heading">
              <h3 class="panel-title">Leaderboard</h3>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="#"
                      disabled
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      disabled
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Rating"
                      disabled
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Wins"
                      disabled
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.leaderboard.map((player, ix) => {
                  return (
                    <tr>
                      <td>{ix}</td>
                      <td>{player.username}</td>
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
