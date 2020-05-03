<?php

namespace App\Providers;

use RiotAPI\RiotAPI;
use RiotAPI\LeagueAPI\LeagueAPI;
use Illuminate\Support\ServiceProvider;

class RiotAPIServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register ()
    {
        $this->app->bind('RiotAPI', function ($app) {
            $api = new LeagueAPI([
                    //  Your API key, you can get one at https://developer.riotgames.com/
                    LeagueAPI::SET_KEY    => env('RIOT_API_KEY'),
                    //  Target region (you can change it during lifetime of the library instance)
                    LeagueAPI::SET_REGION => Region::LAMERICA_SOUTH,
            ]);

            return $api;
        });
    }
}