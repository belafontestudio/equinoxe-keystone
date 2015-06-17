{{#each results}}
       <li class="card"><a href="/yacht/{{slug}}?{{../q}}"></a>

        <div class="container-yachtcard-img">
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

          <li><span>Price from:</span>{{{numeral [price per week from] currency}}}
          </li>
          <li><span>length:</span>
            {{#if lenght}}
              {{lenght}} m
            {{else}}
              = "-"
            {{/if}}
            
          </li>

          {{#ifOr build refit }}
          <li>
            {{#ifCond build refit }}
                  <span>built:</span> 
                  {{build}}" / refit "{{refit}}
            {{else}}
                  {{#if refit }}
                  <span>refit:</span> 
                   {{refit}}
                  {{/if}}
                  {{#if build }}
                  <span>built:</span> 
                   {{build}}
                  {{/if}}
            {{/ifCond}}
          </li>
          {{/ifOr}} 
          <li><span>guests:</span>
            {{#if guests}}
              {{guests}}
            {{else}}
              = "-"
            {{/if}} 
          </li>
        </ul>
      </li>
{{/each}}