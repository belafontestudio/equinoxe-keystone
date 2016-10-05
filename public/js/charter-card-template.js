{{#each list.results}}
       <li class="card"><a href="/yacht/{{slug}}?{{../q}}"></a>

        <div class="container-yachtcard-img">
            {{#if [message/offers]}}
              <span class="offer-message">
              {{[message/offers]}}
              </span>
            {{/if}}
            {{#if thumbnail.filename}}
              <img src="/uploads/images/yachts/thumbnails/{{thumbnail.filename}}" alt={{thumbnail.filename}}/>
            {{else}}
              <img src="/images/sprite/placeholder.png" alt="placeholder"/>
            {{/if}}
        </div>
        <h3 class="yacht-name">
            {{#if name}}
              {{name}}
            {{else}}
              = "missing"
            {{/if}}
        </h3>
        <ul class="yacht-specs">
          {{#if [price per week from]}}
            <li><span>{{../../translation.Price_from}}</span>{{{numeral [price per week from] currency}}}
            </li>
          {{/if}}
          {{#if price}}
            <li><span>{{../../translation.Price_y}}</span>{{{numeral price currency}}}
            </li>
          {{/if}}
          <li><span>{{../translation.length}}</span>
            {{#if lenght}}
              {{lenght}} m
            {{else}}
              = "-"
            {{/if}}

          </li>

          {{#ifOr build refit }}
          <li>
            {{#ifCond build refit }}
                  <span>{{../../../translation.built}}</span>
                  {{build}}" / refit "{{refit}}
            {{else}}
                  {{#if refit }}
                  <span>{{../../../translation.refit}}</span>
                   {{refit}}
                  {{/if}}
                  {{#if build }}
                  <span>{{../../../translation.built}}</span>
                   {{build}}
                  {{/if}}
            {{/ifCond}}
          </li>
          {{/ifOr}}
          <li><span>{{../translation.guests}}:</span>
            {{#if guests}}
              {{guests}}
            {{else}}
              = "-"
            {{/if}}
          </li>
        </ul>
      </li>
{{/each}}
